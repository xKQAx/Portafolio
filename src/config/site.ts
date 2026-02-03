import type { ContactInfo, ProjectMeta } from '../types'

/** Datos de contacto. Actualizar si cambian. */
export const contactInfo: ContactInfo = {
  email: 'santiagocacuav@gmail.com',
  phone: '+57 311 8526409',
  linkedInUrl: 'https://www.linkedin.com/in/santiago-cacua-villamizar',
}

/** Metadatos de proyectos (URL, privacidad). Textos en i18n. */
export const projectsMeta: ProjectMeta[] = [
  { id: 'alonso', private: true },
  { id: 'opmy', private: false, url: 'https://opmypacificgroup.com/' },
]

/**
 * Endpoint de Formspree para el formulario de contacto.
 * Crear formulario en https://formspree.io y reemplazar con tu endpoint.
 * En producción puedes usar: import.meta.env.VITE_FORMSPREE_ENDPOINT
 */
export const formspreeEndpoint =
  (import.meta.env.VITE_FORMSPREE_ENDPOINT as string) || ''

/** Ruta pública para la foto/avatar (sobre mí). Colocar avatar.jpg en public/; si no existe, se usa placeholder. */
export const avatarPath = `${import.meta.env.BASE_URL}avatar.jpg`
