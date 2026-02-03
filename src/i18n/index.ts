import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import es from './locales/es.json'
import en from './locales/en.json'

const resources = {
  es: { translation: es },
  en: { translation: en },
}

const DETECTION_ORDER = ['localStorage', 'navigator'] as const
const FALLBACK_LNG = 'es'
const SUPPORTED_LNGS = ['es', 'en'] as const

export type SupportedLocale = (typeof SUPPORTED_LNGS)[number]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: FALLBACK_LNG,
    supportedLngs: [...SUPPORTED_LNGS],
    detection: {
      order: [...DETECTION_ORDER],
      caches: ['localStorage'],
      lookupLocalStorage: 'portfolio-lang',
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
