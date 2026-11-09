import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import i18n from '@/i18n/config'
import {
  type Lang,
  type Mode,
  type Scheme,
  STORAGE_KEY,
  serialize,
  type ThemeState,
} from './theme'

type ThemeContextValue = {
  state: ThemeState
  setMode: (m: Mode) => void
  setScheme: (s: Scheme) => void
  setLang: (l: Lang) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

// ?lang= wins on load, so it has to follow a language picked in the menu.
function writeLangParam(lang: Lang) {
  const url = new URL(window.location.href)
  url.searchParams.set('lang', lang)
  window.history.replaceState(window.history.state, '', url)
}

function apply(state: ThemeState) {
  const el = document.documentElement
  el.dataset.mode = state.mode
  el.dataset.scheme = state.scheme
  el.lang = state.lang
}

export function ThemeProvider({
  children,
  initial,
}: {
  children: ReactNode
  initial: ThemeState
}) {
  const [state, setState] = useState<ThemeState>(initial)

  useEffect(() => {
    apply(state)
    localStorage.setItem(STORAGE_KEY, serialize(state))
    if (i18n.language !== state.lang) i18n.changeLanguage(state.lang)
  }, [state])

  const value: ThemeContextValue = {
    state,
    setMode: (mode) => setState((s) => ({ ...s, mode })),
    setScheme: (scheme) => setState((s) => ({ ...s, scheme })),
    setLang: (lang) => {
      writeLangParam(lang)
      setState((s) => ({ ...s, lang }))
    },
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

// Runs in <head> before paint. Mirrors resolveInitial() but inlined (no imports).
export const THEME_BOOTSTRAP = `(function(){try{
var SCHEMES=['bambuzal','sakura','glaciar','crepusculo','pelagem'];
var LANGS=['pt-BR','en','es'];
var raw=localStorage.getItem('petros-theme');var s={};
if(raw){try{s=JSON.parse(raw)||{}}catch(e){}}
var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
var mode=(s.mode==='dark'||s.mode==='light')?s.mode:(prefersDark?'dark':'light');
var scheme=SCHEMES.indexOf(s.scheme)>-1?s.scheme:'bambuzal';
var q=(new URLSearchParams(location.search).get('lang')||'').toLowerCase();if(q==='pt')q='pt-br';
var qLang=LANGS.filter(function(l){return l.toLowerCase()===q})[0];
var lang=qLang||'pt-BR';
var el=document.documentElement;
el.setAttribute('data-mode',mode);el.setAttribute('data-scheme',scheme);el.setAttribute('lang',lang);
requestAnimationFrame(function(){el.classList.add('theme-ready')});
}catch(e){}})()`
