import { IconDownload, IconMapPin } from '@tabler/icons-react'
import { Trans, useTranslation } from 'react-i18next'
import { Tooltip } from '@/components/common/Tooltip'
import { Brand, Button, StatusPill, Tag } from '@/components/primitives'
import { cvFilename, cvHref, isCvFallback } from '@/data/cv'
import { useBrtClock } from '@/hooks/useBrtClock'
import { useTheme } from '@/theme/ThemeProvider'
import { assetUrl } from '@/lib/assetUrl'

const DEV_START_YEAR = 2023
const HERO_TEXT_STYLES = {
  b: <strong className='font-semibold text-text-primary' />,
  i: <em className='font-serif italic text-accent-italic' />,
}

export function Hero({
  onSeePanda,
  active,
}: {
  onSeePanda: () => void
  active: boolean
}) {
  const { t } = useTranslation()
  const clock = useBrtClock()
  const { state } = useTheme()
  const { lang } = state
  const cvFallback = isCvFallback(lang)
  const devYears = new Date().getFullYear() - DEV_START_YEAR

  return (
    <section
      id='home'
      aria-labelledby='home-label'
      data-themed
      data-petros-hero-frozen={active ? undefined : 'true'}
      className='relative flex min-h-[90vh] flex-col justify-center overflow-hidden px-section-pad-sm py-section-gap md:px-section-pad'
    >
      {/* subtle accent grid */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, var(--accent) 0 1px, transparent 1px 80px), repeating-linear-gradient(to bottom, var(--accent) 0 1px, transparent 1px 80px)',
        }}
      />

      <div className='relative mx-auto w-full max-w-6xl'>
        {/* top metadata */}
        <div className='flex flex-wrap items-center justify-between gap-3 animate-petros-rise'>
          <StatusPill pulse>{t('hero.statusPill')}</StatusPill>
          <div className='flex items-center gap-3 font-mono text-meta tracking-meta uppercase text-text-muted'>
            <IconMapPin className='size-3.5 text-accent' stroke={1.5} aria-hidden />
            <span>{t('hero.location')}</span>
            <span aria-hidden>/</span>
            <span aria-live='polite' className='text-text-secondary'>
              {clock} BRT
            </span>
          </div>
        </div>

        {/* main block */}
        <div className='mt-12 grid grid-cols-[minmax(0,1fr)] items-center gap-10 md:grid-cols-[60fr_40fr]'>
          <div>
            <h1
              id='home-label'
              className='animate-petros-rise font-sans font-medium leading-tight [animation-delay:120ms]'
            >
              <Brand
                size='text-[length:min(23vw,var(--text-hero))]'
                className='tracking-hero'
              />
            </h1>
            <p className='mt-4 animate-petros-rise font-serif text-h3 italic text-accent-italic [animation-delay:220ms]'>
              {t('hero.byline')}
            </p>
            <p className='mt-2 animate-petros-rise font-sans text-body text-text-muted [animation-delay:300ms]'>
              {t('hero.degree')}
            </p>
            <p className='mt-6 max-w-xl animate-petros-rise font-sans text-lead leading-body text-text-secondary [animation-delay:380ms]'>
              <Trans i18nKey='hero.description' components={HERO_TEXT_STYLES} />
            </p>
            <p className='mt-4 max-w-xl animate-petros-rise font-sans text-body leading-body text-text-secondary [animation-delay:420ms]'>
              <Trans i18nKey='hero.goals' components={HERO_TEXT_STYLES} />
            </p>
            <div className='mt-8 flex flex-wrap gap-3 animate-petros-rise [animation-delay:460ms]'>
              {/* Styled as the primary button — the Phase 1 Button renders a
                  <button>, so the CTA is an <a> that mirrors its classes (no <a>
                  nested in <button>). href/download follow the active language. */}
              {cvFallback ? (
                <Tooltip label={t('cv.fallbackTooltip')}>
                  <a
                    href={cvHref(lang)}
                    download={cvFilename(lang)}
                    className='inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-accent px-5 font-sans text-body font-medium text-on-accent transition-all duration-[var(--dur-micro)] hover:brightness-110 max-sm:w-full'
                  >
                    <IconDownload className='size-4' stroke={1.75} aria-hidden />
                    {t('hero.downloadCv')}
                  </a>
                </Tooltip>
              ) : (
                <a
                  href={cvHref(lang)}
                  download={cvFilename(lang)}
                  className='inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-accent px-5 font-sans text-body font-medium text-on-accent transition-all duration-[var(--dur-micro)] hover:brightness-110 max-sm:w-full'
                >
                  <IconDownload className='size-4' stroke={1.75} aria-hidden />
                  {t('hero.downloadCv')}
                </a>
              )}
              <Button variant='secondary' className='max-sm:w-full' onClick={onSeePanda}>
                {t('hero.seePanda')}
              </Button>
            </div>
          </div>

          {/* photo + brackets + floating tags */}
          <div className='group relative mx-auto aspect-[4/5] w-full max-w-sm animate-petros-rise [animation-delay:340ms]'>
            <span
              aria-hidden
              className='absolute -left-2 -top-2 size-6 border-l-2 border-t-2 border-accent transition-all duration-[var(--dur-micro)] group-hover:-left-3 group-hover:-top-3'
            />
            <span
              aria-hidden
              className='absolute -right-2 -top-2 size-6 border-r-2 border-t-2 border-accent transition-all duration-[var(--dur-micro)] group-hover:-right-3 group-hover:-top-3'
            />
            <span
              aria-hidden
              className='absolute -bottom-2 -left-2 size-6 border-b-2 border-l-2 border-accent transition-all duration-[var(--dur-micro)] group-hover:-bottom-3 group-hover:-left-3'
            />
            <span
              aria-hidden
              className='absolute -bottom-2 -right-2 size-6 border-b-2 border-r-2 border-accent transition-all duration-[var(--dur-micro)] group-hover:-bottom-3 group-hover:-right-3'
            />
            <img
              src={assetUrl('/images/petros/petros-smiling.png')}
              alt={t('hero.photoAlt')}
              loading='eager'
              decoding='async'
              className='size-full rounded-md object-cover object-[50%_20%] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]'
            />
            <Tag className='absolute -left-4 top-6 animate-petros-float bg-bg-elevated'>
              {t('hero.tagFatec')}
            </Tag>
            <Tag className='absolute -right-4 bottom-10 animate-petros-float bg-bg-elevated [animation-delay:-2s]'>
              {t('hero.tagAka')}
            </Tag>
            <Tag className='absolute -left-4 bottom-20 animate-petros-float bg-bg-elevated [animation-delay:-4s]'>
              {t('hero.tagYears', { years: devYears })}
            </Tag>
          </div>
        </div>
      </div>
    </section>
  )
}
