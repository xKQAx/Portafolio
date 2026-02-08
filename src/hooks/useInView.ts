import { useEffect, useRef, useState } from 'react'

const defaultOptions: IntersectionObserverInit = {
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.1,
}

/**
 * Devuelve true cuando el elemento entra en el viewport (con margen).
 * Útil para animar secciones al hacer scroll.
 */
export function useInView(options?: Partial<IntersectionObserverInit>): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      options ? { ...defaultOptions, ...options } : defaultOptions
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
