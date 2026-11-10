import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { projectsMeta } from '../../config/site'

const PROJECT_KEYS = ['alonso', 'opmy'] as const

export function Projects() {
  const { t } = useTranslation('translation', { keyPrefix: 'projects' })

  return (
    <Section id="projects" title={t('title')}>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {PROJECT_KEYS.map((key) => {
          const meta = projectsMeta.find((m) => m.id === key)
          const linkLabel = t(`${key}.linkLabel`)
          const hasLink = meta && !meta.private && meta.url

          return (
            <Card key={key} as="article" className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100 mb-1">
                {t(`${key}.name`)}
              </h3>
              <p className="text-sm text-blue-400 mb-2">{t(`${key}.client`)}</p>
              <dl className="space-y-3 text-sm sm:text-[0.95rem]">
                {(['problem', 'work', 'includes'] as const).map((field) => (
                  <div key={field}>
                    <dt className="font-medium text-slate-200">{t(`labels.${field}`)}</dt>
                    <dd className="m-0 text-slate-400">{t(`${key}.${field}`)}</dd>
                  </div>
                ))}
              </dl>
              {hasLink && (
                <Button
                  asAnchor
                  href={meta.url}
                  external
                  variant="secondary"
                  className="mt-2"
                >
                  {linkLabel}
                </Button>
              )}
              {meta?.private && (
                <span
                  className="inline-block mt-2 px-2.5 py-1 text-sm text-slate-500 bg-slate-700/50 rounded-md"
                  aria-label={linkLabel}
                >
                  {linkLabel}
                </span>
              )}
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
