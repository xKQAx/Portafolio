import type { ReactNode } from 'react'

export interface CardProps {
  children: ReactNode
  className?: string
  as?: 'article' | 'div'
}

export function Card({ children, className = '', as: Component = 'div' }: CardProps) {
  return (
    <Component
      className={`bg-slate-800/80 border border-slate-700 rounded-xl p-6 transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-slate-900/50 ${className}`.trim()}
    >
      {children}
    </Component>
  )
}
