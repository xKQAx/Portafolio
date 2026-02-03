import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'
import { avatarPath } from '../../config/site'

export function About() {
  const { t } = useTranslation('translation', { keyPrefix: 'about' })

  return (
    <Section id="about" title={t('title')}>
      <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-10 items-start">
        <div className="w-48 h-48 md:w-52 md:h-52 mx-auto md:mx-0 shrink-0 relative">
          <img
            src={avatarPath}
            alt=""
            className="w-full h-full object-cover rounded-xl border-2 border-slate-700"
            width={208}
            height={208}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const next = e.currentTarget.nextElementSibling as HTMLElement
              if (next) next.classList.remove('hidden')
            }}
          />
          <div
            className="hidden w-full h-full flex items-center justify-center bg-slate-800 rounded-xl border-2 border-dashed border-slate-600"
            aria-hidden="true"
          >
            <span className="text-4xl font-bold text-slate-500 tracking-wider">
              SC
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-slate-400 leading-relaxed m-0">{t('paragraph1')}</p>
          <p className="text-slate-400 leading-relaxed m-0">{t('paragraph2')}</p>
        </div>
      </div>
    </Section>
  )
}
