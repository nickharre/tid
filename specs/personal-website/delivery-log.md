# Delivery Log — Personal Website

> Feature: Personal Website
> Delivery Lead: Gene
> Started: 2026-05-05

---

## 2026-05-05 — Kickoff

**Action:** Feature kickoff. Context-sufficiency check completed with user.

**Context gathered:**
- **Purpose:** Portfolio + blog + creative showcase — "make them go woah"
- **Audience:** Potential employers, collaborators, readers
- **Sections:** About, Blog, Projects
- **Design direction:** Engaging, unique, 3D animations, interesting motion
- **Tech:** No hard preference; open to frameworks that support 3D/animation well
- **Hosting:** Vercel or GitHub Pages
- **Ambition:** Polished launch (not MVP)

**Decision:** Route to Product Manager (Marty) for requirements.md.

**Handoff:** Delivery Lead → Product Manager

---

## 2026-05-05 — Requirements Approved

**Action:** User approved requirements.md with clarifications.

**Clarifications incorporated:**
- 3D aesthetic: organic / nature-inspired
- Content: starting fresh, no migration
- Color palette: designer proposes
- Performance: branded loading animation acceptable; perceived performance over raw FCP

**Gate:** Requirements gate PASSED. All ACs testable, scope explicit, NFRs named.

**Handoff:** Product Manager → UI/UX Designer (Dieter)

---

## 2026-05-05 — UX Design Approved

**Action:** User approved design.md UX section.

**Key decisions locked:**
- "Deep Forest at Dusk" palette — dark mode default, bioluminescent green + warm amber
- Organic 3D terrain/flora hero with mouse parallax and scroll-driven camera
- Particle-based loading animation that transitions into hero
- Space Grotesk + Inter typography
- 3D tilt project cards, vine-like blog accents
- Full reduced-motion and accessibility spec

**Gate:** UX Design gate PASSED.

**Handoff:** UI/UX Designer → Developer (Margaret) + DevOps (Charity) in parallel

---

## 2026-05-05 — Architecture & Operations Complete

**Action:** Developer (Margaret) produced Architecture section of design.md and tasks.md. DevOps (Charity) produced Operations section.

**Key architecture decisions:**
- **Astro** — static-first, island architecture, zero JS by default
- **React Three Fiber** — declarative 3D in React islands
- **Tailwind CSS v4** — utility-first with CSS variable theming
- **MDX Content Collections** — type-safe blog and project content
- **Vercel** — primary deployment target

**Tasks:** 23 tasks across 7 phases (Foundation → 3D → Content → Polish → Hardening → CI/CD → Launch)

**Handoff:** Awaiting user approval of architecture + tasks before implementation begins.

---

## 2026-05-05 — Architecture & Tasks Approved

**Action:** User approved design.md (Architecture + Operations) and tasks.md.

**Gate:** Architecture gate PASSED. Implementation begins.

**Handoff:** Developer (Margaret) begins Phase 1 implementation.

---

## 2026-05-05 — Phase 1–6 Implementation Complete

**Action:** Developer (Margaret) implemented the full site.

**Completed:**
- ✓ Astro project scaffolded with React, Tailwind, MDX, Sitemap integrations
- ✓ Tailwind theming with CSS variables (dark/light, "Deep Forest at Dusk" palette)
- ✓ Base layout with SEO meta, Open Graph, theme-init script (no flash)
- ✓ Navigation (glass-effect floating nav, mobile hamburger overlay)
- ✓ Skip link for accessibility
- ✓ 3D Hero scene (React Three Fiber): organic terrain, bioluminescent particles, cursor-reactive lighting, scroll-driven camera, loading state
- ✓ Reduced-motion fallback (static gradient)
- ✓ About section with organic blob photo mask, skill tags
- ✓ Projects section with 3D tilt cards, detail pages
- ✓ Blog with MDX, reading time, prose typography, syntax highlighting
- ✓ RSS feed
- ✓ 404 page with personality
- ✓ Theme toggle (dark/light with localStorage persistence)
- ✓ Footer with social links and bioluminescent hover glow
- ✓ Security headers (vercel.json)
- ✓ CI pipeline (GitHub Actions)
- ✓ Content collections with type-safe schemas
- ✓ Placeholder content (1 blog post, 1 project)

**Build:** Successful. 6 pages, static output. Three.js island ~222KB gzipped (lazy-loaded).

**Status:** Ready for local preview and deployment.

---

## 2026-05-06 — User Feedback: Design Review Requested

**Action:** User feedback — current implementation feels "meh." Wants it to be a work of art, not a SaaS product.

**Key directives:**
- Remove light/dark toggle — commit to ONE mode (dark)
- Make it pop — this is art, not a product
- Get Designer (Dieter) to review and elevate

**Loop-back:** Implementation → Designer (backtrack-one pattern)

**Handoff:** Developer → Designer (Dieter) for design elevation review

---

## 2026-05-06 — Design V2 Approved

**Action:** User approved "Bioluminescent Abyss" redesign. "Wayyyy more like it."

**Key changes locked:**
- Dark only — no theme toggle
- Single continuous descent (Surface → Twilight → Midnight → Abyss → Trench)
- Water surface hero with caustics
- Projects as bioluminescent organisms in 3D space
- Depth indicator as navigation (no nav bar)
- Syne typography
- Electric bioluminescent palette (#00ffa3, #00e5ff against #030806)
- Sonar-ping blog reveals
- Generous void/negative space

**Gate:** Design V2 gate PASSED.

**Action:** Full reimplementation begins. Scrapping V1 layout, keeping Astro/R3F infrastructure.

---

## 2026-05-06 — V2 "Bioluminescent Abyss" Implementation Complete

**Action:** Full reimplementation to Design V2 spec.

**What changed:**
- ❌ Removed: light mode, theme toggle, traditional nav bar, card grid, generic footer, separate blog/projects index pages
- ✓ Single continuous descent page (Surface → Twilight → Midnight → Abyss → Trench)
- ✓ Water surface hero with custom GLSL shader (caustics, mouse ripples, multi-octave waves)
- ✓ Bioluminescent particles (instanced, breathing, drifting)
- ✓ Depth indicator navigation (left edge, scroll-linked progress)
- ✓ Surface return button (appears after scrolling past hero)
- ✓ Syne display font + Space Grotesk body
- ✓ Electric palette (#00ffa3, #00e5ff, #b388ff against #030806)
- ✓ Scroll-reveal text animations
- ✓ Floating/drifting skill tags
- ✓ Project "organisms" with glow borders
- ✓ Blog "transmissions" with sonar-ping aesthetic
- ✓ Contact "trench" — single glowing orb, minimal
- ✓ 404 "signal lost" page
- ✓ Prose styling with bioluminescent links
- ✓ Reduced-motion support preserved
- ✓ Detail pages (blog/project) with "return to depth" navigation

**Build:** Successful. 4 pages (index + 2 detail + 404 + RSS + sitemap). 1MB total.

**Status:** Ready for preview.

---

## 2026-05-06 — Design Review (Dieter)

**Action:** Designer review of V2 implementation against design-v2.md spec.

**Verdict:** Strong foundation. The metaphor lands. But there are gaps between spec and implementation that are holding it back from "art" territory. See detailed findings below.

---

## 2026-05-06 — Implementing Design Review Fixes

**Action:** Implementing Dieter's 5 priority fixes:
1. Hero text caustic effect
2. Zone transition overlay (submersion)
3. Horizontal reveal on text
4. Project organisms idle animation
5. Sonar-ping on blog cards

Plus secondary fixes: depth indicator spacing, skill tag scatter, blog entrance.

---

## 2026-05-06 — Design Review Fixes Implemented

**Action:** All 5 priority fixes + 3 secondary fixes from Dieter's review implemented.

**Changes:**

1. ✓ **Hero caustic text** — animated gradient sweeps across the name like light from the water. Uses `background-clip: text` with a slow conic animation. The text IS part of the scene now.

2. ✓ **Submersion overlay** — radial gradient darkens from edges as you scroll past the hero. Simulates water closing over the viewport. Scroll-linked opacity (starts at 60% through hero, fully opaque at 90%).

3. ✓ **Horizontal sweep reveal** — text in the About section is revealed with a `clip-path: inset()` animation that sweeps left-to-right. Feels like a flashlight beam discovering text that was always there. Not a generic fade-up.

4. ✓ **Project organisms idle animation** — conic-gradient border that creeps around the card continuously (even at rest). Uses `@property --organism-angle` for smooth rotation. Orb indicators drift with their own animation. Cards are staggered left/right (not perfectly aligned).

5. ✓ **Sonar-ping blog entrance** — blog cards enter with scale + opacity + an expanding ring of purple light. Staggered timing via CSS custom properties.

6. ✓ **Skill tags scattered** — positioned absolutely with varied top/left values. They float at different heights like plankton, not in a row.

7. ✓ **Depth indicator spacing** — increased gap from `gap-1` to `gap-8` so dots map better to scroll position.

8. ✓ **Hero text parallax** — text moves at 0.3x scroll speed (slower than page), creating depth separation from the 3D canvas behind it.

**All effects respect `prefers-reduced-motion`.** Caustic text becomes static, reveals are instant, organisms stop animating, sonar pings are disabled.

**Build:** Successful. No errors.

---

## 2026-05-06 — Design Review #3 Polish Fixes

**Action:** Implemented all 4 remaining enhancements from Dieter's review.

**Changes:**

1. ✓ **Ambient underwater particles** — 12 CSS-only particles (mix of small green + larger cyan) drift through all zones below the hero. Fade in after scrolling past the hero section. Maintains the "you're underwater" feeling throughout the entire descent. Hidden with `prefers-reduced-motion`.

2. ✓ **Detail page atmosphere** — Blog and project detail pages now have 7 subtle drifting particles in the background. Maintains the abyssal feeling even on content pages. Low opacity (0.06–0.12) so they don't distract from reading.

3. ✓ **Enhanced dive indicator** — Line extended to 12px height, added a second fainter pulse (sonar echo effect, 0.8s delay). "Dive" text now has a bioluminescent glow halo (`text-shadow`). More magnetic.

4. ✓ **Depth markers with presence** — Lines widened to `w-12`, given gradient treatment (zone-colored → transparent), added glow shadow. Now animate in with the `reveal-sweep` class. Feel like thresholds, not labels.

**Build:** Successful. No errors.

**Designer verdict:** 8/10 → ship-ready. The "woah" is there.

---
