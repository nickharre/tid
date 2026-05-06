# Design: Personal Website

> Date: 2026-05-05
> Status: Draft — UX section awaiting user approval

---

## UX Design

### Design Philosophy

"Organic digital craft." The site should feel like a living thing — breathing, responding, growing. Not a template. Not a grid of cards. A place that rewards curiosity and makes the visitor feel like they've discovered something handmade.

**Principles:**
1. **Nature as interface** — organic shapes, fluid motion, natural lighting
2. **Reward exploration** — every scroll, hover, and click reveals something
3. **Substance over spectacle** — animations serve comprehension, not ego
4. **Quiet confidence** — the craft speaks; the site doesn't shout

---

### Color Palette

**"Deep Forest at Dusk"** — dark mode default, warm and organic.

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--bg-primary` | `#0a0f0d` (near-black green) | `#f4f1eb` (warm parchment) | Page background |
| `--bg-surface` | `#141f1a` (dark moss) | `#ffffff` | Cards, elevated surfaces |
| `--text-primary` | `#e8e4dc` (warm white) | `#1a1a1a` | Body text |
| `--text-secondary` | `#8b9a8f` (sage) | `#5a6b5e` | Secondary text, captions |
| `--accent` | `#7fcea0` (bioluminescent green) | `#2d8a5e` | Links, CTAs, highlights |
| `--accent-glow` | `#7fcea0` at 20% opacity | — | Hover glows, 3D rim light |
| `--accent-warm` | `#d4a574` (amber) | `#b8864a` | Secondary accent, tags |
| `--border` | `#1f2e27` | `#e0ddd6` | Subtle dividers |

**Rationale:** Dark mode as default because 3D elements pop against dark backgrounds. The bioluminescent green accent creates the "organic tech" feel — like light in a deep forest. Warm amber as secondary prevents the palette from feeling cold.

---

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Display / Hero | `Space Grotesk` | 4rem–6rem (fluid) | 700 |
| Headings | `Space Grotesk` | 2rem–3rem (fluid) | 600 |
| Body | `Inter` | 1rem–1.125rem | 400 |
| Code | `JetBrains Mono` | 0.875rem | 400 |
| Caption / Meta | `Inter` | 0.8125rem | 400 |

**Rationale:** Space Grotesk has geometric roots but organic quirks (the curved `a`, the soft `g`) — technical but not robotic. Inter for body is invisible and readable. Fluid sizing via `clamp()` for responsive without breakpoint jumps.

---

### Page Structure & Flows

#### Site Map

```
/ (Landing + Hero)
├── /#about (scroll section)
├── /projects (grid → detail)
│   └── /projects/[slug]
├── /blog (list → post)
│   └── /blog/[slug]
└── (footer with contact on every page)
```

#### Navigation

- **Desktop:** Minimal floating nav, top-right. Semi-transparent glass effect. Items: About, Projects, Blog. Logo/name top-left links home.
- **Mobile:** Hamburger → full-screen overlay with staggered entrance animation. Background blurs.
- **Scroll behavior:** Nav becomes more opaque as user scrolls past hero. Subtle, not jarring.
- **Active state:** Accent underline with organic curve (not straight line).

---

### Screen-by-Screen Specification

#### 1. Loading State

**Purpose:** Make the wait feel intentional, not broken.

| State | Behavior |
|-------|----------|
| Initial (0–1s) | Black screen with a single organic particle slowly pulsing (accent color). Feels like something is waking up. |
| Loading (1–3s) | Particle multiplies — a small cluster forms, gently drifting. A thin progress arc (not bar) grows around it. |
| Ready | Particles burst outward and dissolve into the hero scene. Seamless transition — the loader *becomes* the hero. |

**Reduced motion:** Static logo fade-in with a subtle opacity pulse. No particles.

---

#### 2. Hero / Landing

**Layout:**
```
┌─────────────────────────────────────────────┐
│ [Logo/Name]                    [Nav items]  │
│                                             │
│         [3D Organic Scene]                  │
│     (fills viewport, interactive)           │
│                                             │
│        Your Name                            │
│        Brief tagline (1 line)               │
│                                             │
│        [Scroll indicator — animated]        │
└─────────────────────────────────────────────┘
```

**3D Scene Concept:** An organic, bioluminescent terrain or flora — think deep-sea coral, moss-covered stones, or a gently undulating landscape with volumetric fog. The scene responds to mouse movement (parallax depth) and scroll (camera slowly pushes forward, revealing depth).

**States:**
| State | Behavior |
|-------|----------|
| Default | Scene gently animates (breathing motion, particles drift). Name and tagline visible. |
| Mouse move | Subtle parallax — scene layers shift. Light source follows cursor softly. |
| Scroll begin | Camera pushes into scene. Text fades. About section emerges from below. |
| Mobile | Simplified scene (fewer polygons, no mouse parallax). Touch-scroll still triggers camera push. |
| Reduced motion | Static render of the 3D scene as a high-quality image. No animation. |

**Keyboard:** Tab moves to nav items. No focus trap in the hero.

---

#### 3. About Section

**Layout:**
```
┌─────────────────────────────────────────────┐
│                                             │
│  [Photo/Avatar]        [Narrative text]     │
│  (organic mask         2–3 paragraphs       │
│   shape, not circle)   with personality     │
│                                             │
│  [Skill/interest tags — organic pill shape] │
│                                             │
└─────────────────────────────────────────────┘
```

**Entrance animation:** Content rises from below with a slight organic wobble (like a plant growing). Staggered — photo first, then text, then tags.

**Photo mask:** Blob shape (SVG path), not a circle or rectangle. Subtly morphs on hover.

**States:**
| State | Behavior |
|-------|----------|
| Default | Static after entrance animation completes |
| Hover on photo | Blob mask subtly morphs shape |
| Hover on tag | Tag glows with accent color, slight scale |
| Reduced motion | No entrance animation; content visible immediately |

---

#### 4. Projects Section

**Route:** `/projects`

**Layout — Grid View:**
```
┌─────────────────────────────────────────────┐
│  Projects              [Filter chips]       │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Preview  │  │ Preview  │  │ Preview  │ │
│  │          │  │          │  │          │ │
│  │ Title    │  │ Title    │  │ Title    │ │
│  │ Tags     │  │ Tags     │  │ Tags     │ │
│  └──────────┘  └──────────┘  └──────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

**Card interaction:**
| State | Behavior |
|-------|----------|
| Default | Card at rest. Subtle shadow. |
| Hover | Card tilts in 3D toward cursor (perspective transform). Accent glow on edges. Preview image gains depth (parallax layers). |
| Focus (keyboard) | Same glow as hover, no tilt. Clear focus ring in accent color. |
| Active/pressed | Card scales down slightly (0.98). |
| Loading (image) | Skeleton with organic shimmer animation. |

**Filter chips:** Organic pill shapes. Active chip filled with accent. Transition between states is smooth (width animates, color cross-fades).

**Layout — Detail View (`/projects/[slug]`):**
```
┌─────────────────────────────────────────────┐
│  ← Back to Projects                         │
│                                             │
│  [Hero image / demo — full width]           │
│                                             │
│  Project Title                              │
│  [Tech tags]                                │
│                                             │
│  Description (2–4 paragraphs)               │
│                                             │
│  [Screenshots / gallery]                    │
│                                             │
│  [Live Site ↗]  [Source Code ↗]            │
│                                             │
└─────────────────────────────────────────────┘
```

**Page transition:** Projects grid → detail uses a shared-element transition (card expands into the detail hero). Falls back to crossfade if View Transitions API unavailable.

---

#### 5. Blog Section

**Route:** `/blog`

**Layout — List View:**
```
┌─────────────────────────────────────────────┐
│  Blog                                       │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Post Title                          │   │
│  │ Date · 5 min read                   │   │
│  │ Excerpt text (2 lines max)...       │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Post Title                          │   │
│  │ Date · 8 min read                   │   │
│  │ Excerpt text (2 lines max)...       │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

**Post card interaction:**
| State | Behavior |
|-------|----------|
| Default | Clean, minimal. Left accent border (thin, accent color). |
| Hover | Border thickens organically (grows like a vine). Background subtly shifts. |
| Focus | Accent border + focus ring. |

**Layout — Post View (`/blog/[slug]`):**
```
┌─────────────────────────────────────────────┐
│  ← Back to Blog                             │
│                                             │
│  Post Title                                 │
│  Date · Reading time                        │
│                                             │
│  [Article content — max-width prose]        │
│  - Proper heading hierarchy                 │
│  - Code blocks with syntax highlighting     │
│  - Images with captions                     │
│  - Blockquotes styled                       │
│                                             │
│  [Tags]                                     │
│                                             │
└─────────────────────────────────────────────┘
```

**Typography in posts:** Generous line-height (1.7). Max-width ~65ch for readability. Code blocks use the warm dark surface color with accent-colored syntax tokens.

---

#### 6. Footer / Contact

```
┌─────────────────────────────────────────────┐
│                                             │
│  Let's connect                              │
│                                             │
│  [GitHub] [LinkedIn] [Twitter/X] [Email]    │
│  (icons with organic hover glow)            │
│                                             │
│  © 2026 · Built with craft                  │
│                                             │
└─────────────────────────────────────────────┘
```

**Icon hover:** Glow expands outward like bioluminescence. Slight float-up.

---

#### 7. Theme Toggle

**Location:** In nav, rightmost item.

**Interaction:**
| State | Behavior |
|-------|----------|
| Click/tap | Sun ↔ moon icon morphs (SVG path animation). Page colors transition over 300ms. 3D scene lighting shifts (warm → cool or vice versa). |
| Reduced motion | Instant swap, no morph animation. |

**Persistence:** `localStorage`. Respects `prefers-color-scheme` on first visit.

---

### Motion & Animation Principles

| Principle | Implementation |
|-----------|---------------|
| Organic easing | Use spring physics or custom bezier curves — never linear or default ease. `cubic-bezier(0.34, 1.56, 0.64, 1)` for bouncy; `cubic-bezier(0.22, 1, 0.36, 1)` for smooth. |
| Staggered reveals | Elements enter in sequence (50–100ms stagger). Direction follows reading order. |
| Scroll-linked | Parallax and reveals tied to scroll position via Intersection Observer or scroll-driven animations. |
| Micro-interactions | Every interactive element has hover/focus/active states with motion. Nothing is static. |
| Performance budget | Animations use `transform` and `opacity` only (GPU-composited). No layout-triggering properties animated. |
| Reduced motion | All animation behind `prefers-reduced-motion` media query. Fallback is instant state change. |

---

### Responsive Behavior

| Breakpoint | Adaptation |
|------------|------------|
| Desktop (>1024px) | Full 3D scene, mouse parallax, 3-column project grid, floating nav |
| Tablet (768–1024px) | Simplified 3D (fewer particles), 2-column grid, nav still visible |
| Mobile (<768px) | 2D fallback or minimal 3D, 1-column stack, hamburger nav, touch-optimized tap targets (min 44px) |

---

### Accessibility Specification

| Requirement | Implementation |
|-------------|---------------|
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables all animation. 3D scene shows static render. |
| Keyboard navigation | All interactive elements focusable. Visible focus rings (accent color, 2px offset). Logical tab order. |
| Screen reader | Semantic HTML5 landmarks. 3D canvas has `aria-hidden="true"` with text alternative nearby. Blog posts use proper heading hierarchy. |
| Color contrast | All text meets 4.5:1 minimum (AA). Accent on dark bg: 7fcea0 on 0a0f0d = 9.2:1 ✓ |
| Touch targets | Minimum 44×44px on mobile. |
| Skip link | "Skip to content" link visible on focus, bypasses nav and hero. |

---

### Error / Empty / Edge States

| State | Behavior |
|-------|----------|
| 404 page | Organic illustration (lost in the forest). "This path doesn't exist" with link home. Maintains site theme. |
| Blog — no posts yet | "Seeds planted. Posts growing soon." with organic illustration. |
| Projects — no projects | "Workshop is open. Projects coming soon." |
| Projects — filter yields nothing | "Nothing here yet" with suggestion to clear filters. |
| Image load failure | Organic placeholder gradient (not broken image icon). |
| 3D load failure | Graceful fallback to a static gradient background with floating CSS particles. Site remains fully usable. |

---

---

## Architecture

### Tech Stack Decision

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Astro** (v5+) | Static-first, island architecture for selective hydration. 3D only hydrates where needed — rest is zero-JS HTML. Perfect for content sites with interactive islands. |
| 3D Engine | **Three.js** + **React Three Fiber (R3F)** | R3F gives declarative 3D in React islands. Three.js is the most mature WebGL library. Huge ecosystem of helpers (drei, postprocessing). |
| 3D Helpers | **@react-three/drei** + **@react-three/postprocessing** | Pre-built components (environment lighting, float, particles) and effects (bloom, vignette) without writing raw shaders. |
| Animation | **Framer Motion** | Spring physics, layout animations, scroll-linked motion. Handles reduced-motion natively. |
| Styling | **Tailwind CSS v4** | Utility-first, tree-shakes aggressively, CSS variables for theming. |
| Content | **Astro Content Collections** (MDX) | Type-safe frontmatter, MDX for rich blog posts, built-in to Astro. |
| Syntax Highlighting | **Shiki** (built into Astro) | Accurate, theme-aware code highlighting at build time. |
| Deployment | **Vercel** (primary) / GitHub Pages (fallback) | Vercel: zero-config Astro support, edge CDN, preview deploys. GH Pages: free fallback. |
| Package Manager | **pnpm** | Fast, disk-efficient, strict dependency resolution. |

### Why Astro over Next.js / Remix / SvelteKit

- **Zero JS by default.** Blog posts and About page ship as pure HTML. Only the 3D hero and interactive project cards hydrate.
- **Island architecture.** The 3D scene is a React island — it doesn't bloat the rest of the site.
- **Content Collections.** First-class MDX support with schema validation. No plugin gymnastics.
- **Static output.** `astro build` produces a static site deployable anywhere. No server runtime.
- **View Transitions.** Built-in page transition API for the shared-element project card → detail animation.

### Project Structure

```
/
├── public/
│   ├── fonts/                    # Self-hosted Space Grotesk, Inter, JetBrains Mono
│   ├── images/                   # Static images (photo, og-images)
│   └── models/                   # 3D assets (.glb) — loaded lazily
├── src/
│   ├── components/
│   │   ├── three/                # React Three Fiber components (islands)
│   │   │   ├── HeroScene.tsx     # Main 3D hero scene
│   │   │   ├── Terrain.tsx       # Organic terrain geometry
│   │   │   ├── Particles.tsx     # Bioluminescent particles
│   │   │   ├── Lighting.tsx      # Theme-aware lighting rig
│   │   │   └── Loader.tsx        # Loading animation (particles → hero)
│   │   ├── ui/                   # Shared UI components
│   │   │   ├── Nav.astro
│   │   │   ├── Footer.astro
│   │   │   ├── ThemeToggle.tsx   # React island (needs state)
│   │   │   ├── ProjectCard.tsx   # React island (3D tilt interaction)
│   │   │   ├── FilterChips.tsx   # React island (interactive filtering)
│   │   │   └── SkipLink.astro
│   │   └── blog/
│   │       ├── PostCard.astro
│   │       └── Prose.astro       # Blog post typography wrapper
│   ├── content/
│   │   ├── config.ts             # Content collection schemas
│   │   ├── blog/                 # MDX blog posts
│   │   │   └── hello-world.mdx
│   │   └── projects/             # Project MDX/YAML entries
│   │       └── example-project.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML shell, meta, fonts, theme script
│   │   ├── PageLayout.astro      # Standard page (nav + footer)
│   │   └── PostLayout.astro      # Blog post layout (prose styling)
│   ├── pages/
│   │   ├── index.astro           # Landing (hero + about)
│   │   ├── projects/
│   │   │   ├── index.astro       # Project grid
│   │   │   └── [slug].astro      # Project detail
│   │   ├── blog/
│   │   │   ├── index.astro       # Blog list
│   │   │   └── [slug].astro      # Blog post
│   │   ├── 404.astro             # Custom 404
│   │   └── rss.xml.ts            # RSS feed endpoint
│   ├── styles/
│   │   ├── global.css            # Tailwind directives, CSS variables, base styles
│   │   └── prose.css             # Blog post typography
│   └── lib/
│       ├── theme.ts              # Theme toggle logic, localStorage, system preference
│       └── utils.ts              # Reading time calc, date formatting, etc.
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Component Architecture

```
┌─────────────────────────────────────────────────────┐
│ BaseLayout.astro                                    │
│ ┌─────────────────────────────────────────────────┐ │
│ │ <html> <head> meta, fonts, theme-init script    │ │
│ │ <body>                                          │ │
│ │   SkipLink.astro                                │ │
│ │   Nav.astro (with ThemeToggle island)           │ │
│ │   <slot/> ← page content                       │ │
│ │   Footer.astro                                  │ │
│ │ </body>                                         │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘

Islands (client:visible or client:load):
- HeroScene.tsx → client:load (needs to start loading immediately)
- ThemeToggle.tsx → client:load (needs interactivity on page load)
- ProjectCard.tsx → client:visible (hydrate when scrolled into view)
- FilterChips.tsx → client:visible
```

### 3D Architecture

```
HeroScene (R3F Canvas)
├── Suspense boundary (shows Loader while assets load)
├── Environment (HDRI lighting, theme-aware)
├── Terrain (procedural organic geometry via noise)
├── Particles (instanced mesh, bioluminescent)
├── Fog (volumetric depth)
├── PostProcessing
│   ├── Bloom (glow on accent-colored elements)
│   └── Vignette (subtle edge darkening)
└── Camera Controls (scroll-linked position, mouse parallax)
```

**Performance strategy for 3D:**
- Terrain generated procedurally (no large model downloads)
- Particles use `InstancedMesh` (single draw call for hundreds of particles)
- LOD: reduce particle count and disable postprocessing on mobile
- `useFrame` throttled to 30fps on mobile, 60fps on desktop
- Canvas uses `dpr={[1, 1.5]}` — caps pixel ratio to avoid GPU strain on retina

### Data Flow

```
Content Collections (MDX + frontmatter)
        │
        ▼ (build time)
Astro Static Generation
        │
        ▼
Static HTML + CSS + JS islands
        │
        ▼ (deploy)
Vercel CDN / GitHub Pages
```

No runtime data fetching. All content resolved at build time. Blog posts and projects are just files in `src/content/`.

### Cross-Cutting Concerns

**Theming:**
- Theme script in `<head>` (blocking, tiny) reads `localStorage` or `prefers-color-scheme` and sets `data-theme` attribute on `<html>` before paint — no flash of wrong theme.
- CSS variables swap via `[data-theme="dark"]` / `[data-theme="light"]` selectors.
- 3D scene reads theme from a React context and adjusts lighting/materials.

**SEO:**
- Astro generates static HTML — fully crawlable.
- `BaseLayout` includes: `<title>`, `<meta description>`, Open Graph tags, Twitter card tags.
- Blog posts get `article` structured data (JSON-LD).
- `sitemap.xml` auto-generated via `@astrojs/sitemap`.
- `rss.xml` endpoint for blog feed.

**Performance:**
- Fonts self-hosted with `font-display: swap` and preloaded.
- Images optimized via Astro's built-in `<Image>` component (WebP, srcset).
- 3D assets lazy-loaded — site is usable before they arrive.
- Tailwind tree-shakes unused CSS. Final CSS < 15KB gzipped.

**Accessibility:**
- Semantic landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`.
- Skip link as first focusable element.
- 3D canvas: `aria-hidden="true"`, decorative. Text content exists outside canvas.
- Focus management on page transitions (focus moves to main content).
- `prefers-reduced-motion` respected at CSS and JS levels.

---

## Operations

### Hosting & Deployment

| Concern | Solution |
|---------|----------|
| Primary host | **Vercel** — zero-config Astro adapter, global edge CDN, automatic HTTPS |
| Fallback host | **GitHub Pages** — `astro build` output to `dist/`, deploy via GH Actions |
| Preview deploys | Vercel auto-deploys every PR branch — shareable preview URLs |
| Custom domain | Configure in Vercel dashboard (or CNAME for GH Pages) |
| Build command | `pnpm build` |
| Output directory | `dist/` |

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
trigger: push to main, PR to main

jobs:
  lint-and-type-check:
    - pnpm install
    - pnpm lint (ESLint + Prettier check)
    - pnpm typecheck (tsc --noEmit)

  build:
    - pnpm build
    - Verify output exists and is < 5MB total

  lighthouse:
    - Run Lighthouse CI on build output
    - Assert: Performance > 80, Accessibility > 95, SEO > 90

  deploy-preview (PR only):
    - Vercel auto-handles this

  deploy-production (main only):
    - Vercel auto-deploys on push to main
```

### Observability

| Signal | Tool | Notes |
|--------|------|-------|
| Analytics | **Plausible** (deferred — out of scope) | Privacy-friendly, no cookie banner needed. Add later. |
| Error tracking | **Sentry** (optional, deferred) | Only needed if JS errors in 3D become a problem. |
| Uptime | **Vercel built-in** | Vercel monitors edge availability. |
| Build health | **GitHub Actions** | CI status badge in README. |

### Security

| Concern | Mitigation |
|---------|------------|
| Dependencies | Dependabot enabled. `pnpm audit` in CI. |
| Content injection | No user-generated content. All content is author-controlled MDX. |
| HTTPS | Enforced by Vercel/GH Pages by default. |
| Headers | Security headers via `vercel.json`: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`. |

### Cost

| Item | Cost |
|------|------|
| Vercel (Hobby tier) | Free (100GB bandwidth/month, sufficient for personal site) |
| Domain (if purchased) | ~$12/year |
| Fonts | Free (Google Fonts, self-hosted) |
| 3D assets | Free (procedurally generated) |
| **Total** | **$0–12/year** |

---
