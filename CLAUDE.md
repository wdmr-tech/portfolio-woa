@AGENTS.md

# Proyecto: portfolio-woa

Portafolio personal de **Wladimir Acevedo** — Game Producer & UI Developer en
Red Wine Interactive. Sitio one-page en español (`es-CL`) con subpáginas por
proyecto. Deploy previsto en Vercel.

## Stack

- Next.js 16.3.4 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4 — sin `tailwind.config`; los tokens viven en `app/globals.css`
  dentro de `@theme`
- `framer-motion` — reveals y transiciones de página
- `lenis` — smooth scroll global
- Fuentes: General Sans (display, vía CDN de Fontshare en `app/layout.tsx`) +
  JetBrains Mono (mono, vía `next/font/google`)

## Estado

### Construido

- **Home one-page** (`app/page.tsx`): `Hero` · `Bio` · `ProjectsGrid` · `Footer`
  (el footer es la sección Contacto).
- **Subpáginas de proyecto** `/proyectos/[slug]` — SSG con `generateStaticParams`.
  Incluyen header con meta, portada, overview, "Mi aporte" (contributions),
  enlaces externos, galería y link al siguiente proyecto (cíclico).
- **404** propio (`app/not-found.tsx`).
- **Contenido**: 2 proyectos en `content/projects.ts` — Foedus (Unity) y
  Project Island (Unreal Engine). Cada uno con portada + galería.
- **Imágenes** optimizadas a WebP (~1 MB en total; los originales PNG de ~20 MB
  fueron reemplazados). `next/image` sirve AVIF/WebP según el cliente.
- **Motion**: reveals línea a línea tras máscara, fade-up, cortina de transición
  entre páginas (`app/template.tsx` se remonta en cada navegación).
- **Cursor propio** (`components/CustomCursor.tsx`).
- **Responsive** revisado; nav condensada y centrada en mobile.
- **Git** inicializado, primer commit en `main`.

### Pendiente

- Push a GitHub y deploy en Vercel (aún no hecho).
- `site.url` en `lib/site.ts` es un placeholder (`wladimiracevedo.vercel.app`) —
  verificar o actualizar tras el deploy; alimenta `metadataBase` y las OG tags.
- OG image: no hay `app/opengraph-image`. Las páginas de proyecto usan la portada;
  la home no tiene imagen social propia.
- `links: []` vacío en ambos proyectos (sin Steam / itch / trailer todavía).
- Galería sin lightbox/zoom (grid estático).
- Sin `sitemap`, `robots`, analytics, tests ni CI.
- Comprobar en un teléfono real: Hero a 320 px y el header de subpágina.

## Decisiones de diseño

- **Monocromo, sin color de acento.** Solo `--color-paper` (#ffffff) y
  `--color-ink` (#0a0a0a). La jerarquía se hace con escala, peso y opacidad.
- **Secciones invertidas.** La clase `.invert-section` (Bio, Footer, overview de
  proyecto) invierte `::selection` y el fondo de `.glass` para fondo oscuro.
- **Tipografía fluida.** Toda la escala de titulares es `clamp()` en tokens
  (`--text-display/-headline/-lede/-label`). Los saltos de línea de los titulares
  son manuales y a propósito (arrays de strings en `MaskText` / datos).
- **Un solo sistema de layout.** La utilidad `.shell` = `max-width: 100rem` +
  gutters fluidos `clamp(1.25rem, 5vw, 6rem)`. Rejillas de 12 columnas en `md+`.
- **Easing compartido.** `cubic-bezier(0.16, 1, 0.3, 1)` está duplicado a
  propósito en `globals.css` (`--ease-out-expo`) y en `lib/animations.ts`
  (`easeOutExpo`); mantener ambos en sync.
- **Degradación por accesibilidad.** Con `prefers-reduced-motion: reduce` el
  smooth scroll cae a nativo y el cursor propio no se monta. El cursor tampoco se
  monta si no hay `(hover: hover) and (pointer: fine)` — en touch se conserva el
  comportamiento nativo y la selección de texto.
- **Placeholder de portada.** `components/ProjectCover.tsx` dibuja un placeholder
  rayado en vez de una imagen rota si falta el archivo o falla la carga.
- **Contenido tipado y centralizado.** `content/projects.ts` expone el array
  `projects` y los helpers `getProject` / `getAdjacentProject` (este último hace
  wrap para el "siguiente proyecto"). Datos de sitio y nav en `lib/site.ts`.

## Convenciones de código

- **API del cursor**: cualquier elemento con `data-cursor` activa el estado
  "hover" del cursor; `data-cursor-label="Ver"` además muestra ese texto dentro
  del círculo. Los enlaces/botones ya lo heredan por el selector `INTERACTIVE`.
- **Reveals**: usar los componentes de `components/Reveal.tsx` (`Reveal`,
  `RevealGroup`, `MaskText`) en vez de escribir variantes de framer-motion a mano.
- **Variantes de animación**: definirlas en `lib/animations.ts`, no inline.
- Componentes server por defecto; `"use client"` solo cuando se usa motion,
  estado o efectos (Hero, Nav, cursor, cards, smooth scroll, template).
- Copy siempre en español.
