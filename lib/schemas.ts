import { z } from "zod";

/**
 * Shared validation contracts (brief §5, §6.6). Zod 4 top-level string
 * formats. Each form ships a honeypot field that must stay empty (brief §6.6).
 */

export const newsletterSchema = z.object({
  email: z.email({ message: "Enter a valid email address" }),
  // Honeypot — real users never fill this
  company: z.string().max(0).optional(),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

/** General contact / management enquiry (routes to Supreme Music Group). */
export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email({ message: "Enter a valid email address" }),
  subject: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10, "A sentence or two helps"),
  // Honeypot
  website: z.string().max(0).optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const eventTypes = [
  "club",
  "festival",
  "private",
  "corporate",
  "wedding",
  "brand",
] as const;

export const budgetRanges = [
  "under-2k",
  "2k-5k",
  "5k-10k",
  "10k-plus",
  "discuss",
] as const;

export const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email({ message: "Enter a valid email address" }),
  phone: z.string().max(40).optional().or(z.literal("")),
  organisation: z.string().min(2, "Tell us who you represent"),
  eventType: z.enum(eventTypes),
  eventDate: z.string().optional().or(z.literal("")),
  venueOrCity: z.string().min(2, "Add a venue or city"),
  expectedAttendance: z.string().max(40).optional().or(z.literal("")),
  budgetRange: z.enum(budgetRanges).optional(),
  message: z.string().min(10, "A sentence or two about the event helps"),
  // Honeypot
  website: z.string().max(0).optional(),
});
export type BookingInput = z.infer<typeof bookingSchema>;
