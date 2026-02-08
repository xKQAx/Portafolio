import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function ReadingProgressBar() {
  const { t } = useTranslation('translation', { keyPrefix: 'readingProgress' })
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setPercent(total > 0 ? Math.min(100, (scrollTop / total) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed left-0 top-0 z-[100] h-0.5 w-full bg-slate-800/80"
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t('label')}
    >
      <div
        className="h-full bg-blue-500 transition-[width] duration-150 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
