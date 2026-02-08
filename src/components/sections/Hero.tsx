import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { getCvUrl } from '../../config/site'

export function Hero() {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'hero' })
  const cvUrl = getCvUrl(i18n.language)

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{
        paddingTop: 'max(5rem, env(safe-area-inset-top))',
        paddingBottom: 'max(6rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(var(--section-padding-x), env(safe-area-inset-left))',
        paddingRight: 'max(var(--section-padding-x), env(safe-area-inset-right))',
      }}
    >
      {/* Fondos en capas para profundidad */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            'linear-gradient(180deg, rgba(15, 23, 42, 0.97) 0%, rgba(15, 23, 42, 0.92) 40%, rgba(30, 41, 59, 0.9) 100%)',
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.18) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(30, 58, 138, 0.12) 0%, transparent 40%)`,
        }}
      />
      {/* Rejilla sutil */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-section max-w-2xl text-center relative">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-2 animate-slide-up tracking-tight break-words">
          {t('name')}
        </h1>
        <p className="text-lg sm:text-xl text-blue-400 font-medium mb-3 animate-slide-up delay-1">
          {t('role')}
        </p>
        <p className="text-slate-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto animate-slide-up delay-2 leading-relaxed">
          {t('tagline')}
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center animate-slide-up delay-3">
          <Button onClick={scrollToProjects}>{t('ctaProjects')}</Button>
          <Button variant="secondary" onClick={scrollToContact}>
            {t('ctaContact')}
          </Button>
          {cvUrl && (
            <Button
              asAnchor
              href={cvUrl}
              external
              variant="ghost"
              className="border-slate-500 text-slate-300 hover:text-slate-100 hover:border-slate-400"
            >
              {t('ctaCv')}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
