/**
 * Datos para SEO: Open Graph, Twitter Cards y JSON-LD.
 * Single source of truth para títulos, descripciones e imagen social.
 */

export const seo = {
  title: 'Santiago Cacua · Sistemas y páginas web para negocios',
  description:
    'Creo sistemas de gestión y páginas web a la medida para negocios. Conoce mis proyectos y conversemos sobre lo que necesitas.',
  /** Ruta a la imagen para redes (relativa a la base del sitio). Recomendado 1200×630 px. */
  imagePath: 'og-image.jpg',
  /** URL del sitio en producción (opcional). Si no se define, se usa origin + base en cliente. */
  siteUrl: import.meta.env.VITE_SITE_URL as string | undefined,
  /** Perfil LinkedIn para sameAs en JSON-LD */
  linkedInUrl: 'https://www.linkedin.com/in/santiago-cacua-villamizar',
  /** Email para JSON-LD Person */
  email: 'santiagocacuav@gmail.com',
  /** Nombre completo para JSON-LD */
  name: 'Santiago Cacua Villamizar',
  jobTitle: 'Web Developer',
} as const
