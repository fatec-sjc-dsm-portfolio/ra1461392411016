import { describe, expect, it } from 'vitest'
import { buildMailto, contactSchema, isHoneypot } from './contact'

describe('contactSchema', () => {
  it('accepts a valid payload', () => {
    const r = contactSchema.safeParse({
      name: 'Petros',
      email: 'a@b.com',
      message: 'hello',
    })
    expect(r.success).toBe(true)
  })
  it('rejects an invalid email', () => {
    const r = contactSchema.safeParse({ name: 'P', email: 'nope', message: 'hi' })
    expect(r.success).toBe(false)
  })
  it('rejects an empty message', () => {
    const r = contactSchema.safeParse({ name: 'P', email: 'a@b.com', message: '' })
    expect(r.success).toBe(false)
  })
  it('rejects a message over 500 chars', () => {
    const r = contactSchema.safeParse({
      name: 'P',
      email: 'a@b.com',
      message: 'x'.repeat(501),
    })
    expect(r.success).toBe(false)
  })
})

describe('isHoneypot', () => {
  it('is false when website is empty/absent', () => {
    expect(isHoneypot({})).toBe(false)
    expect(isHoneypot({ website: '   ' })).toBe(false)
  })
  it('is true when website is filled', () => {
    expect(isHoneypot({ website: 'http://spam' })).toBe(true)
  })
})

describe('buildMailto', () => {
  const input = { name: 'Ana Lu', email: 'ana@x.com', message: 'Oi & tchau' }

  it('addresses the mail to the given inbox', () => {
    expect(buildMailto(input, 'me@x.com').startsWith('mailto:me@x.com?')).toBe(true)
  })
  it('round-trips subject and body, with spaces encoded as %20', () => {
    const url = buildMailto(input, 'me@x.com')
    expect(url).not.toContain('+')
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('subject')).toBe('Portfolio contact — Ana Lu')
    expect(params.get('body')).toBe('From: Ana Lu <ana@x.com>\n\nOi & tchau')
  })
})
