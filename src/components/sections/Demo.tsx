import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import { Section } from '../ui/Section'

const MIN_WIDTH = 280
const MAX_WIDTH = 900
const BREAKPOINTS = { md: 640, lg: 900 }

function getBreakpoint(width: number): 'mobile' | 'tablet' | 'desktop' {
  if (width < BREAKPOINTS.md) return 'mobile'
  if (width < BREAKPOINTS.lg) return 'tablet'
  return 'desktop'
}

const DEVICE_FRAME = {
  mobile: { bezel: 12 },
  tablet: { bezel: 16 },
  desktop: { bezel: 0 },
} as const

export function Demo() {
  const { t } = useTranslation('translation', { keyPrefix: 'demo' })
  const [viewportWidth, setViewportWidth] = useState(380)

  const breakpoint = useMemo(
    () => getBreakpoint(viewportWidth),
    [viewportWidth]
  )

  const frame = DEVICE_FRAME[breakpoint]
  const isMobile = breakpoint === 'mobile'
  const isTablet = breakpoint === 'tablet'
  const isDesktop = breakpoint === 'desktop'

  return (
    <Section
      id="demo"
      title={t('title')}
      header={
        <p className="text-slate-400 text-lg m-0 mt-1">{t('subtitle')}</p>
      }
    >
      <div className="grid gap-6">
        <div className="p-6 md:p-8 bg-slate-800/60 border border-slate-700 rounded-xl card-glow transition-shadow">
          <h3 className="text-lg font-medium text-blue-400 mb-2">
            {t('responsive')}
          </h3>
          <p className="text-slate-400 m-0 mb-6">{t('responsiveDesc')}</p>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div
              className="flex gap-2 flex-wrap"
              role="tablist"
              aria-label={t('responsiveBreakpoints')}
            >
              {(['mobile', 'tablet', 'desktop'] as const).map((bp) => (
                <button
                  key={bp}
                  type="button"
                  role="tab"
                  aria-selected={breakpoint === bp}
                  onClick={() => {
                    const w =
                      bp === 'mobile' ? 380 : bp === 'tablet' ? 700 : MAX_WIDTH
                    setViewportWidth(w)
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    breakpoint === bp
                      ? 'bg-blue-500/30 text-blue-300 ring-1 ring-blue-400/50'
                      : 'bg-slate-700/60 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
                  }`}
                >
                  {t(`breakpoint_${bp}`)}
                </button>
              ))}
            </div>
            <div className="flex-1 min-w-[200px] flex items-center gap-3">
              <span className="text-slate-500 text-xs tabular-nums w-12">
                {viewportWidth}px
              </span>
              <input
                type="range"
                min={MIN_WIDTH}
                max={MAX_WIDTH}
                value={viewportWidth}
                onChange={(e) => setViewportWidth(Number(e.target.value))}
                className="flex-1 h-2 rounded-full appearance-none bg-slate-600 accent-blue-500 cursor-pointer"
                aria-label={t('responsiveResize')}
              />
            </div>
          </div>

          <div
            className="demo-device-frame mx-auto flex flex-col items-center transition-all duration-400 ease-out"
            style={{
              maxWidth:
                isDesktop ? undefined : viewportWidth + frame.bezel * 2 + (isDesktop ? 32 : 0),
            }}
          >
            {isMobile && (
              <div
                className="w-full rounded-[32px] bg-slate-950 border-[12px] border-slate-800 shadow-2xl overflow-hidden"
                style={{ maxWidth: viewportWidth + frame.bezel * 2 }}
              >
                <div className="h-6 bg-slate-950 flex justify-center items-end pb-1">
                  <div className="w-20 h-5 rounded-full bg-slate-800" />
                </div>
                <div
                  className="bg-slate-900 overflow-hidden transition-[width] duration-300"
                  style={{ width: viewportWidth, margin: '0 auto' }}
                >
                  <FullPreviewContent
                    breakpoint="mobile"
                    showStatusBar={true}
                    showBrowserBar={false}
                  />
                </div>
                <div className="h-6 bg-slate-950 flex justify-center items-center pt-1">
                  <div className="w-24 h-1 rounded-full bg-slate-600" />
                </div>
              </div>
            )}

            {isTablet && (
              <div
                className="w-full rounded-[24px] bg-slate-950 border-[16px] border-slate-800 shadow-2xl overflow-hidden"
                style={{ maxWidth: viewportWidth + frame.bezel * 2 }}
              >
                <div
                  className="bg-slate-900 overflow-hidden transition-[width] duration-300 mx-auto"
                  style={{ width: viewportWidth }}
                >
                  <FullPreviewContent
                    breakpoint="tablet"
                    showStatusBar={false}
                    showBrowserBar={false}
                  />
                </div>
              </div>
            )}

            {/* Desktop: 100% ancho, se adapta al espacio disponible */}
            {isDesktop && (
              <div className="w-full max-w-full rounded-lg overflow-hidden border border-slate-600 bg-slate-800/90 shadow-xl min-w-0">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-700/80 border-b border-slate-600">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-slate-500" />
                    <span className="w-3 h-3 rounded-full bg-slate-500" />
                    <span className="w-3 h-3 rounded-full bg-slate-500" />
                  </div>
                  <span className="text-slate-400 text-xs flex-1 text-center font-medium truncate">
                    {t('responsivePreview')} — {viewportWidth}px (autoadaptable)
                  </span>
                </div>
                <div className="bg-slate-900 overflow-hidden w-full min-w-0">
                  <FullPreviewContent
                    breakpoint="desktop"
                    showStatusBar={false}
                    showBrowserBar={true}
                  />
                </div>
              </div>
            )}
          </div>

          <p className="text-slate-500 text-sm mt-6 m-0">
            {t('responsiveTip')}
          </p>
        </div>
      </div>
    </Section>
  )
}

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

interface FullPreviewContentProps {
  breakpoint: Breakpoint
  showStatusBar: boolean
  showBrowserBar: boolean
}

/** Misma estructura de secciones para móvil, tablet y desktop; layout responsive según breakpoint. */
function FullPreviewContent({
  breakpoint,
  showStatusBar,
  showBrowserBar,
}: FullPreviewContentProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'demo' })
  const isMobile = breakpoint === 'mobile'
  const isTablet = breakpoint === 'tablet'

  const heroGrid =
    isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-2'
  const featuresGrid =
    isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'
  const galleryGrid =
    isMobile ? 'grid-cols-2' : isTablet ? 'grid-cols-2' : 'grid-cols-3'

  const padding = isMobile ? 'p-2' : isTablet ? 'p-2.5' : 'p-3'
  const sectionGap = isMobile ? 'space-y-2' : isTablet ? 'space-y-3' : 'space-y-4'
  const minHeight = isMobile ? 'min-h-[280px]' : isTablet ? 'min-h-[320px]' : 'min-h-[360px]'

  return (
    <div className="w-full min-w-0 flex flex-col text-left">
      {showStatusBar && (
        <div className="flex items-center justify-between px-3 py-1.5 text-[10px] text-slate-400 bg-slate-800/60">
          <span className="tabular-nums">9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 10h2v8H2zm4-3h2v11H6zm4-3h2v14h-2zm4 3h2v8h-2zm4-4h2v12h-2z" />
            </svg>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9h2v7H1zm4 2h2v5H5zm4-6h2v11H9zm4 2h2v5h-2zm4-4h2v9h-2z" />
            </svg>
          </div>
        </div>
      )}

      {showBrowserBar && (
        <div className="flex items-center gap-2 px-2 py-1.5 bg-slate-800/80 border-b border-slate-700">
          <div className="flex gap-1 text-slate-500 text-[10px] shrink-0">
            <span className="text-slate-400">←</span>
            <span>→</span>
            <span>↻</span>
          </div>
          <div className="min-w-0 flex-1 rounded bg-slate-900 px-2 py-1 text-[10px] text-slate-500 truncate">
            https://mi-sitio.com
          </div>
        </div>
      )}

      <header className={`flex items-center justify-between gap-2 ${padding} border-b border-slate-700/80 shrink-0`}>
        <span className="text-slate-300 font-semibold text-sm truncate">
          Mi sitio
        </span>
        {isMobile ? (
          <button
            type="button"
            className="p-1.5 rounded-lg bg-slate-600/80 text-slate-400 hover:bg-slate-600 transition-colors"
            aria-label="Menú"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <nav className="flex gap-2 text-[10px] text-slate-400 shrink-0">
            <span className="text-blue-400">Inicio</span>
            <span>Proyectos</span>
            <span>Contacto</span>
          </nav>
        )}
      </header>

      <div className={`flex-1 ${padding} ${sectionGap} ${minHeight} overflow-auto`}>
        {/* Sección Hero */}
        <section className="w-full rounded-lg border border-slate-600/60 bg-slate-800/30 overflow-hidden">
          <div className="px-2 py-1.5 border-b border-slate-600/50 bg-slate-700/20">
            <h2 className="text-[10px] font-semibold text-slate-200 md:text-xs">
              {t('desktopHeroTitle')}
            </h2>
          </div>
          <div className={`p-2 grid ${heroGrid} gap-2 md:p-3 md:gap-3`}>
            <div className="min-w-0 flex flex-col gap-1.5 md:gap-2">
              <p className="text-[9px] text-slate-400 leading-snug md:text-[10px]">
                {t('desktopHeroText')}
              </p>
              <button
                type="button"
                className="self-start px-2 py-1 rounded text-[9px] font-medium bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:bg-blue-500/40 transition-colors md:text-[10px]"
              >
                {t('desktopCta')}
              </button>
            </div>
            <div className="aspect-video rounded-md bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-[9px] text-slate-500 shrink-0 min-h-0 md:text-[10px]">
              {t('desktopImagePlaceholder')}
            </div>
          </div>
        </section>

        {/* Sección Características */}
        <section className="w-full rounded-lg border border-slate-600/60 bg-slate-800/30 overflow-hidden">
          <div className="px-2 py-1.5 border-b border-slate-600/50 bg-slate-700/20 md:px-3 md:py-2">
            <h3 className="text-[10px] font-semibold text-slate-200 md:text-xs">
              {t('desktopSectionFeatures')}
            </h3>
          </div>
          <div className={`p-2 grid ${featuresGrid} gap-1.5 md:p-3 md:gap-2`}>
            {[
              t('desktopFeature1'),
              t('desktopFeature2'),
              t('desktopFeature3'),
            ].map((title, i) => (
              <div
                key={i}
                className="rounded-md border border-slate-600/50 bg-slate-800/50 p-1.5 min-w-0 md:p-2"
              >
                <div className="border-b border-slate-600/40 pb-1 mb-1 md:pb-1.5 md:mb-1.5">
                  <div className="w-6 h-6 rounded bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-[8px] md:w-7 md:h-7 md:text-[9px]">
                    {i + 1}
                  </div>
                </div>
                <p className="text-[9px] font-medium text-slate-300 truncate md:text-[10px]">
                  {title}
                </p>
                <p className="text-[8px] text-slate-500 mt-0.5 md:text-[9px]">
                  {t('desktopFeatureDesc')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección Sobre nosotros */}
        <section className="w-full rounded-lg border border-slate-600/60 bg-slate-800/30 overflow-hidden">
          <div className="px-2 py-1.5 border-b border-slate-600/50 bg-slate-700/20 md:px-3 md:py-2">
            <h3 className="text-[10px] font-semibold text-slate-200 md:text-xs">
              {t('desktopSectionAbout')}
            </h3>
          </div>
          <div className="p-2 md:p-3">
            <p className="text-[9px] text-slate-400 leading-snug max-w-full md:text-[10px]">
              {t('desktopAboutText')}
            </p>
          </div>
        </section>

        {/* Sección Galería */}
        <section className="w-full rounded-lg border border-slate-600/60 bg-slate-800/30 overflow-hidden">
          <div className="px-2 py-1.5 border-b border-slate-600/50 bg-slate-700/20 md:px-3 md:py-2">
            <h3 className="text-[10px] font-semibold text-slate-200 md:text-xs">
              {t('desktopSectionGallery')}
            </h3>
          </div>
          <div className={`p-2 grid ${galleryGrid} gap-1.5 md:p-3 md:gap-2`}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-md bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-[8px] text-slate-500 min-h-0 md:text-[9px]"
              >
                {t('desktopImagePlaceholder')} {i}
              </div>
            ))}
          </div>
        </section>

        <footer className="rounded-lg border border-slate-600/60 bg-slate-800/30 px-2 py-1.5 md:px-3 md:py-2">
          <p className="text-[8px] text-slate-500 text-center md:text-[9px]">
            {t('desktopFooterLinks')}
          </p>
        </footer>
      </div>
    </div>
  )
}
