import { describe, expect, it } from 'vitest'
import { assetUrl } from './assetUrl'

describe('assetUrl', () => {
  it('leaves root paths unchanged when the base is /', () => {
    expect(assetUrl('/images/a.png', '/')).toBe('/images/a.png')
  })
  it('prefixes root paths with a sub-path base', () => {
    expect(assetUrl('/images/a.png', '/repo/')).toBe('/repo/images/a.png')
  })
  it('accepts a base without a trailing slash', () => {
    expect(assetUrl('/pdfs/cv.pdf', '/repo')).toBe('/repo/pdfs/cv.pdf')
  })
  it('leaves absolute URLs and data URIs untouched', () => {
    expect(assetUrl('https://x.dev/a.png', '/repo/')).toBe('https://x.dev/a.png')
    expect(assetUrl('data:image/svg+xml,abc', '/repo/')).toBe('data:image/svg+xml,abc')
  })
})
