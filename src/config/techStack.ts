/**
 * Stack técnico para mostrar con iconos (Simple Icons).
 * Slug = nombre en https://simpleicons.org (ej. react, python).
 */

export const TECH_STACK = [
  { name: 'React', slug: 'react' },
  { name: 'Python', slug: 'python' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'HTML5', slug: 'html5' },
  { name: 'CSS', slug: 'css' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Vite', slug: 'vite' },
  { name: 'Git', slug: 'git' },
  { name: 'GitHub', slug: 'github' },
] as const

const SIMPLE_ICONS_CDN = 'https://cdn.simpleicons.org'
/** Color por defecto para iconos (slate-400) */
const ICON_COLOR = '94a3b8'

export function getTechIconUrl(slug: string, color = ICON_COLOR): string {
  return `${SIMPLE_ICONS_CDN}/${slug}/${color}`
}
