import type { ReactNode } from 'react'
import type { SectionId } from '../../types'

export interface SectionProps {
  id: SectionId
  children: ReactNode
  className?: string
  title?: string
  header?: ReactNode
}

export function Section({ id, children, className = '', title, header }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-12 md:py-16 px-6 ${className}`.trim()}
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
