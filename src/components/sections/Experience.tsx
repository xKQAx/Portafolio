import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'

const EXPERIENCE_KEYS = ['alonso', 'opmy'] as const

export function Experience() {
  const { t } = useTranslation('translation', { keyPrefix: 'experience' })

  return (
    <Section id="experience" title={t('title')}>
      <ul className="list-none m-0 p-0 relative">
        {EXPERIENCE_KEYS.map((key, idx) => (
          <li
            key={key}
            className={`relative pl-10 pb-10 ${idx === EXPERIENCE_KEYS.length - 1 ? 'pb-0' : ''}`}
          >
            <span
              className="absolute left-0 top-1 w-3 h-3 rounded-full bg-blue-500 border-[3px] border-slate-900 box-border"
              aria-hidden
            />
            {idx < EXPERIENCE_KEYS.length - 1 && (
              <span
                className="absolute left-[5px] top-6 bottom-0 w-0.5 bg-slate-700"
                aria-hidden
              />
            )}
            <div>
              <div className="flex flex-wrap gap-3 mb-0.5 text-sm text-slate-500">
                <span>{t(`${key}.period`)}</span>
                <span>{t(`${key}.location`)}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-0.5">
                {t(`${key}.role`)}
              </h3>
              <p className="text-blue-400 text-sm mb-2">{t(`${key}.company`)}</p>
              <ul className="m-0 pl-5 text-slate-400 text-[0.95rem] space-y-1">
                {(t(`${key}.bullets`, { returnObjects: true }) as string[]).map(
                  (bullet, i) => (
                    <li key={i}>{bullet}</li>
                  )
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
