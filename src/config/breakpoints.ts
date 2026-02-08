/**
 * Breakpoints y layout responsive (Single Source of Truth).
 * Alineado con Tailwind v4 por defecto para uso en JS (useMediaQuery, etc.).
 * SOLID: Responsabilidad única — una sola definición de breakpoints.
 */

/** Valores en px que coinciden con Tailwind v4 por defecto */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type BreakpointKey = keyof typeof BREAKPOINTS

/** Nombres de dispositivo para lógica UI (mobile-first) */
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'wide'

/**
 * Devuelve el tipo de dispositivo según ancho en px.
 * mobile: < md, tablet: md a lg, desktop: lg a xl, wide: >= xl
 */
export function getDeviceType(widthPx: number): DeviceType {
  if (widthPx < BREAKPOINTS.md) return 'mobile'
  if (widthPx < BREAKPOINTS.lg) return 'tablet'
  if (widthPx < BREAKPOINTS.xl) return 'desktop'
  return 'wide'
}

/** Media query min-width para cada breakpoint (para matchMedia) */
export function getMinWidthQuery(breakpoint: BreakpointKey): string {
  return `(min-width: ${BREAKPOINTS[breakpoint]}px)`
}

/** Media query max-width (mobile-first: "hasta este ancho") */
export function getMaxWidthQuery(breakpoint: BreakpointKey): string {
  return `(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`
}
