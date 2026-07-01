import { NextResponse } from "next/server";
import { Resend } from "resend";
import { newsletterSchema } from "@/lib/schemas";
import { contact } from "@/lib/links";

/**
 * Newsletter capture (brief §6.8). Honest behaviour: validates + honeypots,
 * emails via Resend only when RESEND_API_KEY is set, otherwise accepts the
 * signup without pretending to deliver. Swap in a store when one exists.
 * ponytail: no persistence layer yet — email is the delivery path for now.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  // Honeypot tripped — look successful, do nothing
  if (parsed.data.company) return NextResponse.json({ ok: true });

  const key = process.env.RESEND_API_KEY;
  if (key) {
    try {
      const resend = new Resend(key);
      await resend.emails.send({
        from: process.env.MAIL_FROM ?? "Swifty Beats <noreply@swiftybeats.com>",
        to: process.env.MAIL_TO ?? contact.bookings,
        subject: "New newsletter signup",
        text: `New signup: ${parsed.data.email}`,
      });
    } catch {
      // Delivery failed but the capture is valid; don't fail the user
    }
  }

  return NextResponse.json({ ok: true });
}
