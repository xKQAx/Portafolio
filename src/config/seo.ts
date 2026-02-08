/**
 * Datos para SEO: Open Graph, Twitter Cards y JSON-LD.
 * Single source of truth para títulos, descripciones e imagen social.
 */

export const seo = {
  title: 'Santiago Cacua · Ingeniero de Software',
  description:
    'Ingeniero de Software. Desarrollo full-stack, metodologías ágiles y soluciones que escalan. Portfolio y contacto.',
  /** Ruta a la imagen para redes (relativa a la base del sitio). Recomendado: 1200×630 px. */
  imagePath: 'avatar.jpg',
  /** URL del sitio en producción (opcional). Si no se define, se usa origin + base en cliente. */
  siteUrl: import.meta.env.VITE_SITE_URL as string | undefined,
  /** Perfil LinkedIn para sameAs en JSON-LD */
  linkedInUrl: 'https://www.linkedin.com/in/santiago-cacua-villamizar',
  /** Email para JSON-LD Person */
  email: 'santiagocacuav@gmail.com',
  /** Nombre completo para JSON-LD */
  name: 'Santiago Cacua Villamizar',
  jobTitle: 'Software Engineer',
} as const
