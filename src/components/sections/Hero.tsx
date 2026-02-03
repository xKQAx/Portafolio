import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'

export function Hero() {
  const { t } = useTranslation('translation', { keyPrefix: 'hero' })

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800/80"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-2 animate-slide-up">
          {t('name')}
        </h1>
        <p className="text-xl text-blue-400 font-medium mb-3 animate-slide-up delay-1">
          {t('role')}
        </p>
        <p className="text-slate-400 text-lg mb-8 animate-slide-up delay-2">
          {t('tagline')}
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-slide-up delay-3">
          <Button onClick={scrollToProjects}>{t('ctaProjects')}</Button>
          <Button variant="secondary" onClick={scrollToContact}>
            {t('ctaContact')}
          </Button>
        </div>
      </div>
    </section>
  )
}
