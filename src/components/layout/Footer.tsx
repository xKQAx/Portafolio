import { useTranslation } from 'react-i18next'
import { contactInfo } from '../../config/site'
import { LanguageSwitcher } from './LanguageSwitcher'

const currentYear = new Date().getFullYear()

export function Footer() {
  const { t } = useTranslation('translation', { keyPrefix: 'footer' })

  return (
    <footer
      className="py-8 sm:py-10 bg-slate-800/50 border-t border-slate-700/50"
      style={{
        paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(var(--section-padding-x), env(safe-area-inset-left))',
        paddingRight: 'max(var(--section-padding-x), env(safe-area-inset-right))',
      }}
    >
      <div className="container-section max-w-5xl text-center">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4">
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-slate-400 hover:text-blue-400 transition-colors"
          >
            {contactInfo.email}
          </a>
          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
            className="text-slate-400 hover:text-blue-400 transition-colors"
          >
            {contactInfo.phone}
          </a>
          <a
            href={contactInfo.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-400 transition-colors"
          >
            LinkedIn
          </a>
        </div>
        <div className="flex justify-center mb-3">
          <LanguageSwitcher />
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-full break-words">
          {t('madeWith')} · © {currentYear} Santiago Cacua · {t('rights')}
        </p>
      </div>
    </footer>
  )
}
