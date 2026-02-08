# Portafolio · Santiago Cacua Villamizar

Portafolio personal como Ingeniero de Software. React + TypeScript + Vite, desplegado en GitHub Pages.  
Idiomas: español e inglés (detección automática y selector manual).

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

La salida queda en `dist/`. Para previsualizar:

```bash
npm run preview
```

## Configuración

### Formulario de contacto (Formspree)

1. Crea una cuenta en [Formspree](https://formspree.io) y un formulario.
2. Copia el endpoint (ej: `https://formspree.io/f/xxxxxxxx`).
3. Crea un archivo `.env` en la raíz del proyecto:

   ```
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/tu-id
   ```

4. Para GitHub Pages: en el repositorio ve a **Settings → Secrets and variables → Actions** y añade el secreto `VITE_FORMSPREE_ENDPOINT` con el mismo valor. Así el workflow de deploy usará el endpoint en el build.

Si no configuras el endpoint, el formulario no se enviará y se mostrará un mensaje con tu correo para contacto directo.

### Avatar / foto (Sobre mí)

Coloca tu imagen en `public/avatar.jpg`. Si no existe, se muestra un placeholder con las iniciales "SC".

## Despliegue en GitHub Pages

1. En el repositorio: **Settings → Pages**.
2. En **Build and deployment**, en "Source" elige **GitHub Actions** (no "Deploy from a branch").
3. El workflow `.github/workflows/deploy.yml` se ejecuta en cada push a `main`: hace el build y publica la carpeta `dist/` directamente como sitio. No se usa la rama `gh-pages`.

**Importante:** Si antes tenías Pages con "Deploy from a branch" y rama `gh-pages`, cámbialo a **GitHub Actions**. Así se sirve el build correcto (con `/Portafolio/assets/...`) y no el código fuente (que pediría `/src/main.tsx` y daría 404).

La URL quedará en `https://xkqax.github.io/Portafolio/`.

## Estructura del proyecto

- `src/components/ui` — Componentes reutilizables (Button, Section, Card).
- `src/components/layout` — Header, Footer, LanguageSwitcher.
- `src/components/sections` — Hero, About, Experience, Projects, Skills, Contact, Demo.
- `src/config/site.ts` — Contacto, proyectos, endpoint Formspree, ruta del avatar.
- `src/i18n` — Traducciones ES/EN y configuración de i18next.
- La carpeta `docs/` está en `.gitignore` (solo uso local).

## Licencia

Uso personal. Todos los derechos reservados.
