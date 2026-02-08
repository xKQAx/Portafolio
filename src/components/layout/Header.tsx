import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { SectionId } from '../../types'
import { LanguageSwitcher } from './LanguageSwitcher'

const SECTION_IDS: SectionId[] = ['about', 'process', 'experience', 'projects', 'skills', 'contact', 'demo']

export function Header() {
  const { t } = useTranslation('translation', { keyPrefix: 'nav' })
  const { t: tDemo } = useTranslation('translation', { keyPrefix: 'demo' })
  const [menuOpen, setMenuOpen] = useState(false)

  const goTo = useCallback((id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }, [])

  const navLabels: Record<SectionId, string> = {
    hero: t('about'),
    about: t('about'),
    process: t('process'),
    experience: t('experience'),
    projects: t('projects'),
    skills: t('skills'),
    contact: t('contact'),
    demo: tDemo('title'),
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50"
      style={{
        paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
        paddingLeft: 'max(var(--section-padding-x), env(safe-area-inset-left))',
        paddingRight: 'max(var(--section-padding-x), env(safe-area-inset-right))',
      }}
    >
      <div className="container-section max-w-5xl flex items-center justify-between gap-2 sm:gap-4 py-3 min-h-[var(--header-height)]">
        <a
          href="#hero"
          className="font-bold text-base sm:text-lg text-slate-100 tracking-wide hover:text-blue-400 transition-colors shrink-0"
          onClick={(e) => {
            e.preventDefault()
            goTo('hero')
          }}
        >
          SC
        </a>
        <nav className="flex items-center" aria-label="Principal">
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2.5 text-slate-100 rounded-lg hover:bg-slate-800 touch-manipulation"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="w-5 h-0.5 bg-current rounded" />
            <span className="w-5 h-0.5 bg-current rounded" />
            <span className="w-5 h-0.5 bg-current rounded" />
          </button>
          <ul
            id="nav-menu"
            className={`flex max-md:absolute max-md:top-full max-md:left-0 max-md:right-0 max-md:flex-col max-md:bg-slate-800 max-md:border-b max-md:border-slate-700 max-md:py-3 max-md:gap-0 max-md:shadow-lg
              md:flex md:flex-row list-none m-0 p-0 gap-1
              max-md:transition-all max-md:duration-300 max-md:max-h-[min(70vh,400px)] max-md:overflow-y-auto
              ${menuOpen ? 'max-md:opacity-100 max-md:visible max-md:translate-y-0' : 'max-md:opacity-0 max-md:invisible max-md:-translate-y-2 max-md:pointer-events-none'}`}
          >
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  className="block w-full md:w-auto text-left md:text-center px-4 py-3 md:py-1.5 text-sm text-slate-400 rounded-md hover:text-slate-100 hover:bg-blue-500/10 transition-colors touch-manipulation"
                  onClick={() => goTo(id)}
                >
                  {navLabels[id]}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
