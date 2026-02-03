import { useTranslation } from 'react-i18next'
import type { SupportedLocale } from '../../i18n'

const LOCALES: { code: SupportedLocale; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="flex gap-1" role="group" aria-label="Idioma / Language">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`px-2.5 py-1 text-sm font-medium rounded-md border transition-colors ${
            i18n.language === code
              ? 'bg-blue-500/15 border-blue-500 text-blue-400'
              : 'bg-transparent border-slate-600 text-slate-400 hover:text-slate-100 hover:border-slate-500'
          }`}
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={i18n.language === code}
          aria-label={code === 'es' ? 'Español' : 'English'}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
