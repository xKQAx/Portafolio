import type { ReactNode } from 'react'
import type { SectionId } from '../../types'
import { useInView } from '../../hooks/useInView'

export interface SectionProps {
  id: SectionId
  children: ReactNode
  className?: string
  title?: string
  header?: ReactNode
  /** Si es false, la sección no usa fondo alternado ni animación al scroll */
  alternate?: boolean
}

export function Section({
  id,
  children,
  className = '',
  title,
  header,
  alternate = true,
}: SectionProps) {
  const [ref, inView] = useInView()

  return (
    <section
      ref={ref}
      id={id}
      className={`py-12 md:py-16 px-6 transition-all duration-700 ease-out ${
        alternate ? 'bg-slate-800/30' : ''
      } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`.trim()}
      aria-labelledby={title ? `${id}-heading` : undefined}
    >
      <div className="max-w-4xl mx-auto">
        {(title || header) && (
          <header className="mb-8">
            {title && (
              <h2
                id={`${id}-heading`}
                className="text-2xl md:text-3xl font-semibold text-slate-100 mb-1"
              >
                {title}
              </h2>
            )}
            {header}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
