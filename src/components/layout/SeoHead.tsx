import { useEffect } from 'react'
import { seo } from '../../config/seo'

/**
 * Inyecta en <head> las meta de Open Graph, Twitter Cards y el JSON-LD de Person.
 * Usa el origen actual para URLs absolutas (funciona en local y en producción).
 */
export function SeoHead() {
  useEffect(() => {
    const baseUrl = (seo.siteUrl ?? `${window.location.origin}${import.meta.env.BASE_URL}`).replace(/\/?$/, '/')
    const pageUrl = window.location.href
    const imageUrl = `${baseUrl.replace(/\/?$/, '/')}${seo.imagePath}`

    const setMeta = (attr: string, value: string, isProperty = false) => {
      const key = isProperty ? 'property' : 'name'
      let el = document.querySelector(`meta[${key}="${attr}"][content]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(key, attr)
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = pageUrl

    setMeta('og:title', seo.title, true)
    setMeta('og:description', seo.description, true)
    setMeta('og:url', pageUrl, true)
    setMeta('og:image', imageUrl, true)
    setMeta('og:type', 'website', true)
    setMeta('og:locale', 'es_ES', true)
    setMeta('og:site_name', seo.title, true)

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', seo.title)
    setMeta('twitter:description', seo.description)
    setMeta('twitter:image', imageUrl)

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: seo.name,
      jobTitle: seo.jobTitle,
      url: baseUrl,
      email: seo.email,
      sameAs: [seo.linkedInUrl],
      description: seo.description,
    }

    let scriptEl = document.getElementById('json-ld-person') as HTMLScriptElement | null
    if (!scriptEl) {
      scriptEl = document.createElement('script')
      scriptEl.id = 'json-ld-person'
      scriptEl.type = 'application/ld+json'
      document.head.appendChild(scriptEl)
    }
    scriptEl.textContent = JSON.stringify(jsonLd)
  }, [])

  return null
}
