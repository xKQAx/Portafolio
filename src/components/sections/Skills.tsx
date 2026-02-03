import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'

const SKILL_GROUPS = [
  { key: 'web', labelKey: 'web', itemsKey: 'webItems' },
  { key: 'management', labelKey: 'management', itemsKey: 'managementItems' },
  { key: 'devops', labelKey: 'devops', itemsKey: 'devopsItems' },
  { key: 'languages', labelKey: 'languages', itemsKey: 'languagesItems' },
] as const

export function Skills() {
  const { t } = useTranslation('translation', { keyPrefix: 'skills' })

  return (
    <Section id="skills" title={t('title')}>
      <div className="grid gap-6 md:grid-cols-2">
        {SKILL_GROUPS.map(({ key, labelKey, itemsKey }) => (
          <div
            key={key}
            className="p-6 bg-slate-800/60 border border-slate-700 rounded-xl"
          >
            <h3 className="text-base font-medium text-blue-400 mb-2">
              {t(labelKey)}
            </h3>
            <p className="text-slate-400 text-[0.95rem] m-0">{t(itemsKey)}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
