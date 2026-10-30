import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email(),
  message: z.string().trim().min(1).max(500),
  // Honeypot: must stay empty. Not validated for content, only presence.
  website: z.string().optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

export function isHoneypot(input: { website?: string }): boolean {
  return Boolean(input.website && input.website.trim().length > 0)
}

// GitHub Pages has no server, so the form hands the message to the visitor's
// email app instead of sending it.
export function buildMailto(input: ContactInput, to: string): string {
  const params = new URLSearchParams({
    subject: `Portfolio contact — ${input.name}`,
    body: `From: ${input.name} <${input.email}>\n\n${input.message}`,
  })
  // URLSearchParams encodes spaces as '+', which mail clients show literally.
  return `mailto:${to}?${params.toString().replace(/\+/g, '%20')}`
}
