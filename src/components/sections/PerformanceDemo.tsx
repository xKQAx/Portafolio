import { useTranslation } from 'react-i18next'
import { useState, useEffect, useRef } from 'react'
import { useInView } from '../../hooks/useInView'

type Mode = 'before' | 'after'

const LAZY_IMAGE_COUNT = 6

/** Métricas simuladas: peores en "Antes", mejores en "Después" */
function MetricsBar({ mode, loadedCount = 0 }: { mode: Mode; loadedCount?: number }) {
  const { t } = useTranslation('translation', { keyPrefix: 'demo' })

  const before = {
    lcp: '2.4s',
    requests: '8',
    bundle: '420 KB',
  }
  const after = {
    lcp: '0.9s',
    requests: `${Math.min(2 + loadedCount, 8)}`,
    bundle: '120 KB',
  }
  const m = mode === 'before' ? before : after

  return (
    <div
      className="rounded-lg border border-slate-600/60 bg-slate-800/40 px-3 py-2"
      aria-label={t('perfMetrics')}
    >
      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">
        {t('perfMetrics')}
      </p>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-[10px] text-slate-500 m-0">{t('perfLCP')}</p>
          <p
            className={`text-sm font-semibold tabular-nums m-0 ${
              mode === 'after' ? 'text-emerald-400' : 'text-amber-400/90'
            }`}
          >
            {m.lcp}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-slate-500 m-0">{t('perfRequests')}</p>
          <p
            className={`text-sm font-semibold tabular-nums m-0 ${
              mode === 'after' ? 'text-emerald-400' : 'text-amber-400/90'
            }`}
          >
            {m.requests}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-slate-500 m-0">{t('perfBundle')}</p>
          <p
            className={`text-sm font-semibold tabular-nums m-0 ${
              mode === 'after' ? 'text-emerald-400' : 'text-amber-400/90'
            }`}
          >
            {m.bundle}
          </p>
        </div>
      </div>
    </div>
  )
}

/** Bloque que "carga" cuando entra en el viewport (lazy loading) */
function LazyImageBlock({
  index,
  onLoaded,
}: {
  index: number
  onLoaded: () => void
}) {
  const { t } = useTranslation('translation', { keyPrefix: 'demo' })
  const [ref, inView] = useInView({ rootMargin: '0px 0px -30px 0px', threshold: 0.05 })
  const [loaded, setLoaded] = useState(false)
  const reported = useRef(false)

  useEffect(() => {
    if (!inView || loaded) return
    const id = setTimeout(() => {
      setLoaded(true)
      if (!reported.current) {
        reported.current = true
        onLoaded()
      }
    }, 200 + index * 60)
    return () => clearTimeout(id)
  }, [inView, index, loaded, onLoaded])

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="rounded-lg overflow-hidden border border-slate-600/50">
      <div className="aspect-video flex items-center justify-center min-h-0 relative">
        {!loaded ? (
          <div className="absolute inset-0 perf-skeleton flex items-center justify-center rounded-lg">
            <span className="text-slate-500 text-xs drop-shadow-sm">
              {t('perfLazyLoading')}
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 perf-loaded-in bg-gradient-to-br from-blue-500/20 to-slate-600/30 flex items-center justify-center gap-1.5 text-emerald-400 text-xs">
            <span className="w-4 h-4 rounded-full bg-emerald-500/40 flex items-center justify-center text-[10px]">
              ✓
            </span>
            {t('perfLazyLoaded')}
          </div>
        )}
      </div>
      <div className="px-2 py-1 bg-slate-800/50 text-[10px] text-slate-500">
        {t('perfLazyLabel')} {index + 1}
      </div>
    </div>
  )
}

/** Modo Antes: carga bloqueante, barra de progreso, todas a la vez */
function BeforeMode() {
  const { t } = useTranslation('translation', { keyPrefix: 'demo' })
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 900
    const tick = () => {
      const elapsed = Date.now() - start
      setProgress(Math.min(100, (elapsed / duration) * 100))
      if (elapsed < duration) requestAnimationFrame(tick)
      else setLoaded(true)
    }
    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2">
        <p className="text-amber-200/90 text-xs m-0 mb-2">{t('perfBlocking')}</p>
        <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-amber-500/70 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg overflow-hidden border border-slate-600/50">
            <div className="aspect-video flex items-center justify-center min-h-0 relative">
              {!loaded ? (
                <div className="absolute inset-0 perf-skeleton flex items-center justify-center rounded-lg">
                  <span className="text-slate-500 text-xs">{t('perfLazyLoading')}</span>
                </div>
              ) : (
                <div className="absolute inset-0 perf-loaded-in bg-gradient-to-br from-blue-500/20 to-slate-600/30 flex items-center justify-center gap-1.5 text-emerald-400 text-xs">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/40 flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  {t('perfLazyLoaded')}
                </div>
              )}
            </div>
            <div className="px-2 py-1 bg-slate-800/50 text-[10px] text-slate-500">
              {t('perfLazyLabel')} {i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Modo Después: lazy por vista + sección diferida con "fetch" simulado */
function AfterMode({ onLoadedCountChange }: { onLoadedCountChange: (n: number) => void }) {
  const { t } = useTranslation('translation', { keyPrefix: 'demo' })
  const [deferredState, setDeferredState] = useState<'idle' | 'loading' | 'loaded'>('idle')
  const [loadedCount, setLoadedCount] = useState(0)

  const handleLazyLoaded = () => {
    setLoadedCount((c) => {
      const next = c + 1
      onLoadedCountChange(next)
      return next
    })
  }

  const loadDeferred = () => {
    setDeferredState('loading')
    setTimeout(() => setDeferredState('loaded'), 700)
  }

  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-xs m-0 font-medium">
        {t('perfLazySection')}
      </p>
      <p className="text-slate-500 text-[10px] m-0 -mt-1">
        {t('perfLoadedCount')}: {loadedCount}/{LAZY_IMAGE_COUNT}
      </p>

      <div
        className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin"
        style={{ scrollbarWidth: 'thin' }}
      >
        {Array.from({ length: LAZY_IMAGE_COUNT }, (_, i) => (
          <LazyImageBlock key={i} index={i} onLoaded={handleLazyLoaded} />
        ))}
      </div>

      <div className="pt-3 border-t border-slate-600/50">
        <p className="text-slate-400 text-xs m-0 mb-2 font-medium">
          {t('perfDeferSection')}
        </p>
        {deferredState === 'idle' && (
          <button
            type="button"
            onClick={loadDeferred}
            className="w-full rounded-lg border-2 border-dashed border-slate-500/70 py-3 text-sm text-slate-400 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all"
          >
            {t('perfDeferButton')}
          </button>
        )}
        {deferredState === 'loading' && (
          <div className="rounded-lg border border-slate-600/60 bg-slate-800/50 py-4 flex items-center justify-center gap-2 text-slate-400 text-sm">
            <span className="inline-block w-4 h-4 border-2 border-slate-500 border-t-blue-400 rounded-full animate-spin" />
            {t('perfChunkLoading')}
          </div>
        )}
        {deferredState === 'loaded' && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 perf-loaded-in">
            <h4 className="text-sm font-medium text-emerald-400 mb-1">
              {t('perfDeferTitle')}
            </h4>
            <p className="text-slate-400 text-xs m-0 leading-snug">
              {t('perfDeferText')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export function PerformanceDemo() {
  const { t } = useTranslation('translation', { keyPrefix: 'demo' })
  const [mode, setMode] = useState<Mode>('after')
  const [lazyLoadedCount, setLazyLoadedCount] = useState(0)

  useEffect(() => {
    setLazyLoadedCount(0)
  }, [mode])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2 p-1 rounded-lg bg-slate-800/60 border border-slate-600/50">
          <button
            type="button"
            onClick={() => setMode('before')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === 'before'
                ? 'bg-slate-700 text-slate-100'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {t('perfBefore')}
          </button>
          <button
            type="button"
            onClick={() => setMode('after')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === 'after'
                ? 'bg-slate-700 text-slate-100'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {t('perfAfter')}
          </button>
        </div>
        <MetricsBar mode={mode} loadedCount={lazyLoadedCount} />
      </div>

      <div className="min-h-[240px]">
        {mode === 'before' ? (
          <BeforeMode />
        ) : (
          <AfterMode onLoadedCountChange={setLazyLoadedCount} />
        )}
      </div>

      <p className="text-slate-500 text-xs m-0">
        {t('perfCwv')}
      </p>
    </div>
  )
}
