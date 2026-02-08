import { useState, useEffect } from 'react'
import {
  BREAKPOINTS,
  getMinWidthQuery,
  type BreakpointKey,
} from '../config/breakpoints'

/**
 * Hook para reaccionar a media queries (responsive en JS).
 * SOLID: una única responsabilidad — suscribirse a un media query.
 * Útil cuando el diseño depende de lógica, no solo de CSS.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(media.matches)
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [query])

  return matches
}

/**
 * Atajo: devuelve true si el viewport es >= breakpoint (min-width).
 * Ej: useBreakpoint('md') => true en tablet/desktop.
 */
export function useBreakpoint(minBreakpoint: BreakpointKey): boolean {
  const query = getMinWidthQuery(minBreakpoint)
  return useMediaQuery(query)
}

/**
 * Devuelve el ancho actual del viewport (para lógica que depende del tamaño exacto).
 * Debounced opcional para no re-renderizar en cada resize.
 */
export function useViewportWidth(): number {
  const [width, setWidth] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth : 0)
  )

  useEffect(() => {
    let rafId: number
    const onResize = () => {
      rafId = requestAnimationFrame(() => setWidth(window.innerWidth))
    }
    window.addEventListener('resize', onResize)
    onResize()
    return () => {
      window.removeEventListener('resize', onResize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return width
}

/** Valores de breakpoint en px (para comparaciones numéricas) */
export { BREAKPOINTS }
