import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas";
import { management } from "@/lib/links";

/**
 * Contact enquiry -> Supreme Music Group (brief §6.6). Same honest behaviour as
 * the newsletter: validate + honeypot, deliver via Resend only when
 * RESEND_API_KEY is set, otherwise accept without pretending to send.
 * ponytail: email is the delivery path — no CRM/store until one exists.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 422 });
  }

  // Honeypot tripped — look successful, do nothing
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const { name, email, subject, message } = parsed.data;

  const key = process.env.RESEND_API_KEY;
  if (key) {
    try {
      const resend = new Resend(key);
      await resend.emails.send({
        from: process.env.MAIL_FROM ?? "Swifty Beats <noreply@swiftybeats.com>",
        to: process.env.MAIL_TO ?? management.email,
        replyTo: email,
        subject: subject ? `Contact: ${subject}` : `New enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "(none)"}\n\n${message}`,
      });
    } catch {
      // Delivery failed but the enquiry is valid; don't fail the user
    }
  }

  return NextResponse.json({ ok: true });
}
