import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'

const PHASE_KEYS = [
  'phase1',
  'phase2',
  'phase3',
  'phase4',
  'phase5',
  'phase6',
  'phase7',
] as const

export function Process() {
  const { t } = useTranslation('translation', { keyPrefix: 'process' })

  return (
    <Section
      id="process"
      title={t('title')}
      header={
        <p className="text-slate-400 text-lg m-0 mt-1">{t('subtitle')}</p>
      }
    >
      {/* Flujo: móvil 1 col, tablet 2 cols, desktop 4 cols, wide 7 cols con línea */}
      <div className="relative">
        {/* Línea conectora (solo xl; los círculos la tapan en el centro) */}
        <div
          className="hidden xl:block absolute top-6 left-0 right-0 h-0.5 bg-slate-600/60 z-0"
          aria-hidden
        />

        <ol className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-7 gap-6 sm:gap-4 xl:gap-2 list-none m-0 p-0">
          {PHASE_KEYS.map((key, index) => (
            <li
              key={key}
              className="relative flex flex-col items-center xl:items-start text-center xl:text-left"
            >
              <div className="flex flex-col items-center xl:items-start gap-2 w-full max-w-sm mx-auto xl:max-w-none xl:mx-0">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-blue-500/60 bg-slate-800 text-sm font-semibold text-blue-300">
                  {index + 1}
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-sm font-medium text-slate-200 m-0">
                    {t(`${key}_title`)}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm m-0 leading-snug">
                    {t(`${key}_desc`)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
