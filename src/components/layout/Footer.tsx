import { useTranslation } from 'react-i18next'
import { contactInfo } from '../../config/site'
import { LanguageSwitcher } from './LanguageSwitcher'

const currentYear = new Date().getFullYear()

export function Footer() {
  const { t } = useTranslation('translation', { keyPrefix: 'footer' })

  return (
    <footer className="py-10 px-6 bg-slate-800/50 border-t border-slate-700/50">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
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
        <p className="text-sm text-slate-500">
          {t('madeWith')} · © {currentYear} Santiago Cacua · {t('rights')}
        </p>
      </div>
    </footer>
  )
}
