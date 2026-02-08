import { useTranslation } from 'react-i18next'
import { TECH_STACK, getTechIconUrl } from '../../config/techStack'

export function TechStackIcons() {
  const { t } = useTranslation('translation', { keyPrefix: 'skills' })

  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-slate-400 mb-4">
        {t('stackTitle')}
      </h3>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {TECH_STACK.map(({ name, slug }) => (
          <a
            key={slug}
            href={`https://simpleicons.org/?q=${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 rounded-lg p-3 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            title={name}
          >
            <img
              src={getTechIconUrl(slug)}
              alt=""
              className="h-8 w-8 sm:h-9 sm:w-9"
              width={36}
              height={36}
              loading="lazy"
            />
            <span className="text-xs font-medium">{name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
