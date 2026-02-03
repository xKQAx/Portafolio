# Plan del Portafolio – Santiago Cacua Villamizar

## 1. Objetivos y tono

- **Tono:** Llamativo, elegante y formal.
- **Público:** Reclutadores, clientes potenciales, empresas (ES/EN).
- **Plataforma:** GitHub Pages (SPA con base path configurable).
- **Idioma:** Detección automática (navegador) + selector manual ES/EN, persistido (localStorage).

---

## 2. Arquitectura y principios SOLID

### 2.1 Estructura de carpetas propuesta

```
src/
├── main.tsx
├── App.tsx
├── index.css                    # estilos globales
├── i18n/
│   ├── index.ts                 # configuración i18next
│   ├── locales/
│   │   ├── es.json
│   │   └── en.json
│   └── types.ts                 # tipos para claves de traducción (opcional)
├── components/                  # componentes reutilizables (presentacionales)
│   ├── ui/                      # primitivos (Button, Section, Card, etc.)
│   ├── layout/                  # Header, Footer, Navigation
│   └── sections/                # Hero, About, Experience, Projects, Skills, Contact
├── hooks/                       # lógica reutilizable (useLanguage, useScroll, etc.)
├── config/                      # constantes, rutas, datos estáticos (experiencia, proyectos)
├── types/                       # interfaces y tipos globales
└── assets/
```

- **S (Single Responsibility):** Cada componente/hook tiene una única razón de cambio (ej. `Hero` solo muestra la sección hero; `useLanguage` solo maneja idioma).
- **O (Open/Closed):** Componentes UI parametrizados por props y datos inyectados desde `config/` o padres; añadir secciones o idiomas sin tocar código existente.
- **L (Liskov):** Componentes que extienden comportamientos (ej. botones, cards) sustituibles por sus variantes sin romper la UI.
- **I (Interface Segregation):** Props e interfaces específicas por componente; evitar “god props”.
- **D (Dependency Inversion):** Depender de abstracciones: datos vía props/context (i18n), no de implementaciones concretas; configuración (base path, idiomas) en un solo lugar.

### 2.2 Buenas prácticas

- **Datos separados de la UI:** Experiencia, proyectos y habilidades en `config/` (objetos/arrays) para facilitar mantenimiento y posibles futuras fuentes (CMS, JSON).
- **Componentes presentacionales:** Sections reciben datos por props; la lógica de negocio (idioma, scroll) en hooks o en `App`.
- **Accesibilidad:** `lang` en `<html>` según idioma activo, landmarks (`<main>`, `<nav>`, `<section>`), contraste, focus visible, títulos jerárquicos (h1 → h2).
- **SEO básico:** Meta description y título por idioma, URLs limpias (hash o rutas si se usa router).
- **Rendimiento:** Lazy load de secciones pesadas si hace falta; imágenes optimizadas (WebP, tamaños adecuados).

---

## 3. Secciones y contenido

| Sección      | Contenido resumido |
|-------------|--------------------|
| **Hero**    | Nombre, rol (“Ingeniero de Software” / “Software Engineer”), frase corta, CTA (ver proyectos / contacto), selector de idioma. |
| **Sobre mí**| Breve párrafo (educación UDES, enfoque ágil/full-stack, trabajo freelance internacional). |
| **Experiencia** | Listado cronológico: Alonso Landscape (Full-Stack), OPMY Pacific (Web). Fechas, empresa, ubicación, bullets. |
| **Proyectos** | Cards: Sistema gestor Alonso, Landing OPMY. Descripción, stack, enlaces (si aplica), imagen o placeholder. |
| **Habilidades** | Agrupadas: Desarrollo web (React, Python, JS, APIs…), Gestión (requisitos, ágil, clientes), DevOps (Git, CPanel). |
| **Contacto** | Email, teléfono, LinkedIn; opcional: formulario “Enviar mensaje” (mailto o servicio externo). |
| **Footer**  | Créditos, año, enlaces legales si los hay, mismo selector de idioma o enlace. |

---

## 4. Detalles de funcionalidad que destacan

1. **Selector de idioma (ES/EN)**  
   - En header y/o footer.  
   - Persistencia en `localStorage` y detección inicial del navegador.  
   - Actualización inmediata de todos los textos y de `document.documentElement.lang`.

2. **Navegación por anclas**  
   - Menú fijo que enlaza a `#hero`, `#about`, `#experience`, etc.  
   - Scroll suave (CSS `scroll-behavior: smooth` o pequeño hook con `scrollIntoView`).  
   - Opcional: highlight del ítem activo según scroll (intersection observer).

3. **Hero con impacto visual**  
   - Fondo sutil (gradiente o textura) y tipografía clara.  
   - Un solo CTA principal (“Ver proyectos” o “Contactar”).  
   - Opcional: animación discreta al cargar (fade-in, slide-up).

4. **Cards de proyectos**  
   - Hover con elevación o borde sutil.  
   - Etiquetas de tecnologías (React, Python, etc.).  
   - Enlace externo “Ver proyecto” o “Código” si aplica.

5. **Experiencia legible**  
   - Timeline vertical o lista con fechas destacadas.  
   - Empresa, rol, ubicación (remoto), bullets traducidos.

6. **Footer minimalista**  
   - Enlaces a LinkedIn, email (mailto), teléfono (tel:).  
   - “Hecho con React + Vite” o similar, año dinámico.

7. **Responsive**  
   - Mobile-first; menú colapsable (hamburger) en pantallas pequeñas.  
   - Tipografía y espaciado que escalen bien.

8. **Rendimiento y DX**  
   - Build optimizado para GitHub Pages (base path).  
   - Sin dependencias pesadas innecesarias; TypeScript estricto.

---

## 5. i18n (internacionalización)

- **Librería:** `react-i18next` + `i18next` + `i18next-browser-languagedetector`.
- **Idiomas:** `es` (por defecto) y `en`.
- **Detección:** Orden sugerido: `localStorage` → `navigator` → fallback `es`.
- **Estructura de archivos:** `locales/es.json` y `locales/en.json` con la misma estructura de claves (por sección: hero, about, experience, projects, skills, contact, footer).
- **Contenido dinámico:** Experiencia y proyectos pueden estar en JSON por idioma o en un único JSON con claves `es`/`en` por ítem; se elige según preferencia de mantenimiento.

---

## 6. GitHub Pages

- **Build:** `npm run build` → salida en `dist/`.
- **Base path:** Si el repo es `usuario.github.io/Portafolio`, en `vite.config.ts`: `base: '/Portafolio/'`. Si es `usuario.github.io`, `base: '/'`.
- **Deploy:** GitHub Actions que ejecute `npm ci && npm run build` y publique la carpeta `dist` en la rama `gh-pages` o en `main` (carpeta `/docs`), según tu preferencia. Se puede añadir un workflow `.github/workflows/deploy.yml` más adelante.

---

## 7. Preguntas para afinar

1. **Nombre del repositorio en GitHub**  
   ¿Será `Portafolio`, `portfolio`, `usuario.github.io` u otro? Así definimos el `base` de Vite de una vez.

2. **Enlaces a proyectos**  
   ¿Tienes URLs públicas de los proyectos (Alonso Landscape, OPMY) o solo descripción y stack? Si no hay enlace, podemos dejar “Proyecto privado / bajo NDA” o solo descripción.

3. **Foto o avatar**  
   ¿Quieres una sección “Sobre mí” con foto? Si sí, conviene tener la imagen en `public/` o `src/assets/` y referenciarla por ruta que funcione con el base path.

4. **Formulario de contacto**  
   ¿Solo mailto/tel/LinkedIn o quieres un formulario que envíe a un backend/Formspree/Netlify Forms? Esto afecta si añadimos un mini módulo de “envío de mensaje”.

5. **Paleta y estilo**  
   ¿Alguna preferencia de colores (ej. azul oscuro + acento, o neutros)? Si no, en la implementación proponemos una paleta elegante y formal.

6. **Animaciones**  
   ¿Solo transiciones suaves al scroll o también animaciones más visibles (por ejemplo con Framer Motion)? Mantendremos siempre un tono profesional.

---

## 8. Orden de implementación sugerido

1. Configurar base path y (opcional) workflow de deploy para GitHub Pages.
2. Configurar i18n (detector, ES/EN, estructura de claves).
3. Añadir datos estáticos en `config/` (experiencia, proyectos, habilidades).
4. Crear componentes UI base (Section, Card, Button) y layout (Header con nav + selector idioma, Footer).
5. Implementar secciones en orden: Hero → Sobre mí → Experiencia → Proyectos → Habilidades → Contacto.
6. Estilos globales, tipografía y responsive (incl. menú móvil).
7. Ajustes de accesibilidad y SEO (lang, meta, landmarks).
8. Revisión final y documentación de comandos de build/deploy en README.

---

Cuando respondas las preguntas de la sección 7, podemos bajar esto a tareas concretas y empezar por la configuración (Vite base, i18n) y luego la creación de la página siguiendo este plan y SOLID.
