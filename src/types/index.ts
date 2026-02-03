/** IDs de secciones para anclas y navegación */
export type SectionId =
  | 'hero'
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'contact'
  | 'demo'

/** Datos de contacto estáticos (no traducidos) */
export interface ContactInfo {
  email: string
  phone: string
  linkedInUrl: string
}

/** Proyecto con datos que no dependen del idioma (URL, privacidad) */
export interface ProjectMeta {
  id: string
  /** Si es true, no se muestra enlace externo */
  private: boolean
  /** URL pública; solo usado si private === false */
  url?: string
}
