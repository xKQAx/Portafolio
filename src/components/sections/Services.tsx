import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'

const SERVICE_KEYS = ['management', 'website', 'support'] as const

export function Services() {
  const { t } = useTranslation('translation', { keyPrefix: 'services' })

  return (
    <Section
      id="services"
      title={t('title')}
      header={<p className="text-slate-400 text-lg m-0 mt-1">{t('subtitle')}</p>}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {SERVICE_KEYS.map((key) => (
          <Card key={key} as="article">
            <h3 className="text-base sm:text-lg font-semibold text-slate-100 mb-2">
              {t(`${key}.title`)}
            </h3>
            <p className="text-slate-400 text-sm sm:text-[0.95rem] mb-4">
              {t(`${key}.description`)}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-400">
              {[1, 2, 3].map((item) => (
                <li key={item}>{t(`${key}.item${item}`)}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  )
}
