import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/** Sincroniza el atributo lang del <html> con el idioma activo de i18n (accesibilidad y SEO). */
export function useSyncHtmlLang(): void {
  const { i18n } = useTranslation()
  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])
}
