import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'
import { TechStackIcons } from '../ui/TechStackIcons'

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
      <TechStackIcons />
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
        {SKILL_GROUPS.map(({ key, labelKey, itemsKey }) => (
          <div
            key={key}
            className="p-4 sm:p-6 bg-slate-800/60 border border-slate-700 rounded-xl min-w-0"
          >
            <h3 className="text-sm sm:text-base font-medium text-blue-400 mb-2">
              {t(labelKey)}
            </h3>
            <p className="text-slate-400 text-sm sm:text-[0.95rem] m-0">{t(itemsKey)}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
