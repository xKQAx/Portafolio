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
      <div className="grid gap-8 md:grid-cols-2">
        {PROJECT_KEYS.map((key) => {
          const meta = projectsMeta.find((m) => m.id === key)
          const linkLabel = t(`${key}.linkLabel`)
          const hasLink = meta && !meta.private && meta.url

          return (
            <Card key={key} as="article">
              <h3 className="text-lg font-semibold text-slate-100 mb-1">
                {t(`${key}.name`)}
              </h3>
              <p className="text-sm text-blue-400 mb-2">{t(`${key}.client`)}</p>
              <p className="text-slate-400 text-[0.95rem] mb-4">
                {t(`${key}.description`)}
              </p>
              <p className="text-sm text-slate-500 mb-4">{t(`${key}.stack`)}</p>
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
