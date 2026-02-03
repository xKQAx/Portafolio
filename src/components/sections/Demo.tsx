import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'

export function Demo() {
  const { t } = useTranslation('translation', { keyPrefix: 'demo' })

  return (
    <Section
      id="demo"
      title={t('title')}
      header={
        <p className="text-slate-400 text-lg m-0 mt-1">{t('subtitle')}</p>
      }
    >
      <div className="grid gap-6">
        <div className="p-6 bg-slate-800/60 border border-slate-700 rounded-xl">
          <h3 className="text-lg font-medium text-blue-400 mb-2">
            {t('responsive')}
          </h3>
          <p className="text-slate-400 m-0">{t('responsiveDesc')}</p>
        </div>
      </div>
    </Section>
  )
}
