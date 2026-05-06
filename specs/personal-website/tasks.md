# Tasks: Personal Website

> Author: Developer (Margaret)
> Date: 2026-05-05
> Status: Draft — awaiting approval
> Refs: [requirements.md](./requirements.md) | [design.md](./design.md)

---

## Phase 1: Project Scaffolding & Foundation

### Task 1.1: Initialize Astro project
- **Ref:** Architecture — Tech Stack
- **Action:**
  - `pnpm create astro@latest` with TypeScript strict
  - Add integrations: `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/mdx`, `@astrojs/sitemap`
  - Configure `astro.config.mjs` with site URL, integrations, view transitions
  - Set up `tsconfig.json` with path aliases (`@components/`, `@lib/`, etc.)
- **Done when:** `pnpm dev` serves a blank page, `pnpm build` produces static output.

### Task 1.2: Tailwind + theming setup
- **Ref:** Design — Color Palette, Architecture — Theming
- **Action:**
  - Configure `tailwind.config.ts` with custom colors from design tokens
  - Create `src/styles/global.css` with CSS variables for dark/light themes
  - Add theme-init script in `<head>` (reads localStorage / prefers-color-scheme, sets `data-theme` before paint)
  - Verify no flash of wrong theme on load
- **Done when:** Dark mode renders by default, CSS variables swap correctly.

### Task 1.3: Typography & fonts
- **Ref:** Design — Typography
- **Action:**
  - Self-host Space Grotesk, Inter, JetBrains Mono in `public/fonts/`
  - Add `@font-face` declarations with `font-display: swap`
  - Preload critical fonts in `<head>`
  - Configure Tailwind font families
- **Done when:** All three fonts render correctly, no FOUT on fast connections.

### Task 1.4: Base layout & navigation
- **Ref:** Design — Navigation, FR-5
- **Action:**
  - Create `BaseLayout.astro` (HTML shell, meta, fonts, theme script, skip link)
  - Create `Nav.astro` (floating glass-effect nav, responsive)
  - Create `Footer.astro` (contact links, copyright)
  - Create `SkipLink.astro`
  - Mobile hamburger menu with full-screen overlay
- **Done when:** All pages have consistent nav/footer, skip link works, mobile menu opens/closes.

### Task 1.5: View Transitions setup
- **Ref:** Design — Page transitions
- **Action:**
  - Enable Astro View Transitions (`<ViewTransitions />` in BaseLayout)
  - Configure transition animations (crossfade default, shared-element for project cards)
- **Done when:** Page navigation has smooth transitions, no full-page reload flash.

---

## Phase 2: 3D Hero & Loading Experience

### Task 2.1: React Three Fiber setup
- **Ref:** Architecture — 3D Architecture
- **Action:**
  - Install `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
  - Create `HeroScene.tsx` as a React island (`client:load`)
  - Set up R3F Canvas with proper sizing, DPR capping, and Suspense boundary
  - Verify canvas renders in the Astro page without hydration errors
- **Done when:** A blank R3F canvas renders on the index page.

### Task 2.2: Loading animation
- **Ref:** Design — Loading State
- **Action:**
  - Create `Loader.tsx` — particle-based loading animation
  - Single pulsing particle → multiplying cluster → progress arc
  - Transition: particles burst outward when scene is ready
  - Reduced-motion fallback: simple fade-in
- **Done when:** Loading animation plays while 3D assets initialize, transitions smoothly into hero.

### Task 2.3: Organic terrain
- **Ref:** Design — Hero 3D Scene Concept
- **Action:**
  - Create `Terrain.tsx` — procedural organic geometry using simplex noise
  - Undulating landscape with vertex displacement
  - Material: dark with bioluminescent accent highlights on ridges
  - Gentle breathing animation (slow vertex oscillation)
- **Done when:** Organic terrain renders with subtle animation.

### Task 2.4: Bioluminescent particles
- **Ref:** Design — Hero 3D Scene
- **Action:**
  - Create `Particles.tsx` — instanced mesh particles
  - Drift slowly with organic motion (noise-based paths)
  - Accent-colored with bloom glow
  - Density adjusts based on device capability
- **Done when:** Particles float through the scene with glow effect.

### Task 2.5: Lighting & postprocessing
- **Ref:** Design — Hero, Architecture — 3D
- **Action:**
  - Create `Lighting.tsx` — theme-aware lighting rig
  - Environment map for ambient light
  - Accent-colored point lights
  - PostProcessing: Bloom (on particles/accent), Vignette
  - Light follows cursor softly (mouse parallax)
- **Done when:** Scene has atmospheric lighting, bloom on particles, cursor-reactive light.

### Task 2.6: Camera & scroll interaction
- **Ref:** Design — Hero States
- **Action:**
  - Mouse move → subtle parallax (camera offset)
  - Scroll → camera pushes forward into scene
  - Smooth spring-based transitions
  - Mobile: no mouse parallax, touch-scroll still drives camera
- **Done when:** Scene responds to mouse and scroll with fluid motion.

### Task 2.7: Mobile 3D optimization
- **Ref:** Design — Responsive, NFR — Performance
- **Action:**
  - Detect device capability (GPU tier via `detect-gpu` or similar)
  - Mobile: reduce particle count, disable postprocessing, cap at 30fps
  - Tablet: reduce particles, keep postprocessing
  - Fallback if WebGL unavailable: CSS gradient + floating CSS particles
- **Done when:** 3D performs smoothly on mobile, graceful fallback works.

---

## Phase 3: Content Sections

### Task 3.1: Hero text overlay
- **Ref:** Design — Hero Layout, FR-1
- **Action:**
  - Name + tagline positioned over 3D canvas
  - Animated scroll indicator at bottom
  - Text fades on scroll as camera pushes in
  - Proper z-indexing (text above canvas)
- **Done when:** Name/tagline visible over 3D, fades on scroll.

### Task 3.2: About section
- **Ref:** Design — About Section, FR-2
- **Action:**
  - Create About section on index page (below hero)
  - Blob-shaped photo mask (SVG clip-path, morphs on hover)
  - Narrative text area
  - Skill/interest tags with organic pill shapes
  - Entrance animation: staggered rise with organic easing
  - Reduced-motion: no animation, content visible immediately
- **Done when:** About section renders with all states (default, hover, reduced-motion).

### Task 3.3: Projects grid page
- **Ref:** Design — Projects Grid, FR-3
- **Action:**
  - Create `/projects/index.astro`
  - Set up projects content collection (schema: title, description, tags, image, links, slug)
  - `ProjectCard.tsx` React island with 3D tilt on hover (perspective transform)
  - Accent glow on hover, keyboard focus ring
  - `FilterChips.tsx` for technology filtering
  - Responsive: 3-col → 2-col → 1-col
- **Done when:** Projects page renders cards with tilt interaction and filtering.

### Task 3.4: Project detail page
- **Ref:** Design — Project Detail, FR-3
- **Action:**
  - Create `/projects/[slug].astro`
  - Hero image, title, tech tags, description, screenshots, links
  - Shared-element transition from grid card (View Transitions API)
  - Back navigation
- **Done when:** Clicking a project card transitions to detail page with content.

### Task 3.5: Blog list page
- **Ref:** Design — Blog List, FR-4
- **Action:**
  - Create `/blog/index.astro`
  - Set up blog content collection (schema: title, date, description, tags, draft)
  - `PostCard.astro` with vine-like accent border hover effect
  - Reading time calculation
  - Reverse chronological order
- **Done when:** Blog list renders posts with hover effects.

### Task 3.6: Blog post page
- **Ref:** Design — Blog Post, FR-4
- **Action:**
  - Create `/blog/[slug].astro` with `PostLayout.astro`
  - Prose styling (max-width 65ch, generous line-height)
  - Syntax highlighting via Shiki (theme-aware)
  - Responsive images with captions
  - Proper heading hierarchy
  - Tags at bottom
- **Done when:** Blog posts render with full typography and code highlighting.

### Task 3.7: RSS feed
- **Ref:** FR-4
- **Action:**
  - Create `src/pages/rss.xml.ts` using `@astrojs/rss`
  - Include all published blog posts
  - Proper metadata (title, description, site URL)
- **Done when:** `/rss.xml` returns valid RSS feed.

---

## Phase 4: Interactivity & Polish

### Task 4.1: Theme toggle
- **Ref:** Design — Theme Toggle, FR-7
- **Action:**
  - Create `ThemeToggle.tsx` React island
  - Sun ↔ moon SVG morph animation
  - Updates `data-theme` attribute + localStorage
  - 3D scene lighting responds to theme change
  - Reduced-motion: instant swap
- **Done when:** Toggle switches theme smoothly, persists across sessions, 3D adapts.

### Task 4.2: Scroll animations
- **Ref:** Design — Motion Principles
- **Action:**
  - Intersection Observer-based reveal animations
  - Staggered entrance for lists (projects, tags, blog posts)
  - Organic easing (spring curves)
  - All behind `prefers-reduced-motion` check
- **Done when:** Content animates in on scroll, respects reduced-motion.

### Task 4.3: 404 page
- **Ref:** Design — Error States
- **Action:**
  - Create `src/pages/404.astro`
  - "Lost in the forest" messaging
  - Organic illustration or CSS art
  - Link back home
  - Maintains site theme
- **Done when:** 404 page renders with personality and navigation home.

### Task 4.4: Empty states
- **Ref:** Design — Empty States
- **Action:**
  - Blog empty state: "Seeds planted. Posts growing soon."
  - Projects empty state: "Workshop is open. Projects coming soon."
  - Filter no-results state with clear-filters suggestion
- **Done when:** Empty states render with appropriate messaging.

---

## Phase 5: SEO, Performance & Accessibility Hardening

### Task 5.1: SEO meta & structured data
- **Ref:** NFR — SEO
- **Action:**
  - Open Graph + Twitter Card meta in BaseLayout
  - Per-page title and description
  - Blog posts: `article` JSON-LD structured data
  - Sitemap via `@astrojs/sitemap`
  - Canonical URLs
- **Done when:** Social sharing previews work, sitemap accessible.

### Task 5.2: Performance audit & optimization
- **Ref:** NFR — Performance
- **Action:**
  - Run Lighthouse, identify bottlenecks
  - Optimize images (WebP, proper sizing, lazy loading)
  - Verify 3D lazy-loading doesn't block page usability
  - Verify total JS bundle (excluding 3D) < 50KB gzipped
  - Font subsetting if needed
- **Done when:** Lighthouse Performance > 80 on mobile.

### Task 5.3: Accessibility audit
- **Ref:** NFR — Accessibility, Design — Accessibility Spec
- **Action:**
  - Verify all interactive elements keyboard-navigable
  - Verify focus rings visible and consistent
  - Verify skip link works
  - Verify reduced-motion disables all animation
  - Verify 3D canvas is `aria-hidden` with text alternative
  - Verify color contrast meets AA
  - Test with screen reader (VoiceOver)
- **Done when:** No accessibility violations in automated scan, manual keyboard test passes.

### Task 5.4: Security headers
- **Ref:** Operations — Security
- **Action:**
  - Create `vercel.json` with security headers
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- **Done when:** Headers present in deployed response.

---

## Phase 6: CI/CD & Deployment

### Task 6.1: GitHub repository setup
- **Action:**
  - Initialize git repo
  - Create `.gitignore` (node_modules, dist, .env)
  - Create README.md with project overview and local dev instructions
- **Done when:** Repo initialized with clean history.

### Task 6.2: CI pipeline
- **Ref:** Operations — CI/CD
- **Action:**
  - Create `.github/workflows/ci.yml`
  - Jobs: lint, typecheck, build
  - Lighthouse CI on build output (optional — can add later)
  - Runs on push to main and PRs
- **Done when:** CI passes on push.

### Task 6.3: Vercel deployment
- **Ref:** Operations — Hosting
- **Action:**
  - Connect repo to Vercel
  - Configure build settings (pnpm build, output dist/)
  - Verify preview deploys on PR
  - Verify production deploy on main
- **Done when:** Site live on Vercel with auto-deploys.

---

## Phase 7: Content & Launch

### Task 7.1: Placeholder content
- **Action:**
  - Write About section copy (personal narrative)
  - Create 2–3 placeholder project entries
  - Create 1 "Hello World" blog post
  - Add professional photo or avatar
- **Done when:** All sections have real or realistic content.

### Task 7.2: Final polish pass
- **Action:**
  - Cross-browser testing (Chrome, Firefox, Safari, Edge)
  - Mobile device testing (iOS Safari, Android Chrome)
  - Animation timing refinement
  - Typography fine-tuning
  - Final Lighthouse run
- **Done when:** Site feels polished across all target browsers and devices.

### Task 7.3: Launch
- **Action:**
  - Connect custom domain (if available)
  - Final deploy to production
  - Verify all pages, transitions, 3D, blog, RSS
  - Update README with live URL
- **Done when:** Site is live and accessible at final URL.

---

## Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| 1 | 1.1–1.5 | Foundation: Astro, Tailwind, fonts, layout, transitions |
| 2 | 2.1–2.7 | 3D hero: R3F, terrain, particles, lighting, scroll, mobile |
| 3 | 3.1–3.7 | Content: about, projects, blog, RSS |
| 4 | 4.1–4.4 | Polish: theme toggle, scroll animations, error states |
| 5 | 5.1–5.4 | Hardening: SEO, performance, accessibility, security |
| 6 | 6.1–6.3 | Deployment: git, CI, Vercel |
| 7 | 7.1–7.3 | Content & launch |

**Estimated total:** 23 tasks across 7 phases.
