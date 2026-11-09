import { describe, expect, it } from 'vitest'
import { DEFAULTS, parseLangParam, parseStored, resolveInitial, serialize } from './theme'

describe('parseLangParam', () => {
  it('reads a supported language', () => {
    expect(parseLangParam('?lang=en')).toBe('en')
    expect(parseLangParam('?x=1&lang=es')).toBe('es')
    expect(parseLangParam('?lang=pt-BR')).toBe('pt-BR')
  })
  it('accepts pt as shorthand and ignores case', () => {
    expect(parseLangParam('?lang=pt')).toBe('pt-BR')
    expect(parseLangParam('?lang=EN')).toBe('en')
  })
  it('returns undefined when missing or unsupported', () => {
    expect(parseLangParam('')).toBeUndefined()
    expect(parseLangParam('?lang=fr')).toBeUndefined()
    expect(parseLangParam('?lang=')).toBeUndefined()
  })
})

describe('parseStored', () => {
  it('returns empty object for null', () => {
    expect(parseStored(null)).toEqual({})
  })
  it('returns empty object for malformed json', () => {
    expect(parseStored('{not json')).toEqual({})
  })
  it('keeps only valid keys/values', () => {
    const raw = JSON.stringify({ mode: 'light', scheme: 'nope', lang: 'es', x: 1 })
    expect(parseStored(raw)).toEqual({ mode: 'light', lang: 'es' })
  })
})

describe('resolveInitial', () => {
  it('uses prefersDark for mode when nothing stored', () => {
    expect(resolveInitial({}, true)).toEqual(DEFAULTS)
    expect(resolveInitial({}, false)).toEqual({ ...DEFAULTS, mode: 'light' })
  })
  it('stored values win over prefers-color-scheme', () => {
    expect(resolveInitial({ mode: 'light' }, true).mode).toBe('light')
    expect(resolveInitial({ scheme: 'sakura' }, true).scheme).toBe('sakura')
    expect(resolveInitial({ lang: 'en' }, false).lang).toBe('en')
  })
})

describe('serialize', () => {
  it('round-trips through parseStored', () => {
    const state = { mode: 'light', scheme: 'glaciar', lang: 'en' } as const
    expect(parseStored(serialize(state))).toEqual(state)
  })
})
