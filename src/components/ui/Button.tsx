import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  asAnchor?: boolean
  href?: string
  external?: boolean
}

const baseClasses =
  'inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-medium text-base transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-70 disabled:cursor-not-allowed'

const variantClasses = {
  primary:
    'bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700',
  secondary:
    'bg-transparent text-blue-400 border-2 border-slate-600 hover:border-blue-500 hover:text-blue-300',
  ghost:
    'bg-transparent text-slate-400 border-2 border-transparent hover:text-slate-100',
} as const

export function Button({
  children,
  variant = 'primary',
  className = '',
  asAnchor,
  href,
  external,
  ...rest
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim()

  if (asAnchor && href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
