---
name: web-ui-excellence
description: >
  Produce award-winning, Awwwards-calibre web UI. Use this skill whenever the user asks to build,
  design, or improve a website, landing page, hero section, web component, or any browser-rendered
  interface. Triggers on requests like "build me a homepage", "design a product page", "create a
  web experience", "make this look great", "redesign my site", or any request involving HTML/CSS/JS
  output with visual intent. Also use proactively when producing frontend code for a UI/UX agent —
  even if the user just says "build the frontend" or "make the UI". This skill encodes the
  principles seen in sites like Awwwards SOTD winners, offmenu.design, floema.com, matter.com, and
  amardenvox.com: deliberate typography, considered motion, strong spatial composition, and a
  distinctive point of view. Never produce generic, template-like UI when this skill is active.
---

# Web UI Excellence

You are producing web interfaces at the level of Awwwards Site of the Day winners. Every output must feel deliberate, crafted, and memorable — not generated. This skill defines the principles, constraints, and process to achieve that.

---

## 0. Before You Write a Line of Code

Ask yourself:
- **What is the one thing this interface must communicate?** (Clarity of intent is the foundation.)
- **What is the emotional register?** (Monumental / intimate / playful / urgent / serene / luxurious…)
- **What visual device will anchor the entire design?** (A typeface, a motion system, a spatial rhythm, a colour temperature — pick one and make everything else serve it.)
- **What would make someone screenshot this?**

Only then open an editor.

---

## 1. Typography — The Non-Negotiable First Decision

Typography carries 70% of a great web UI's personality. Treat it as architecture, not decoration.

**Rules:**
- Choose a display typeface with genuine character. Avoid Inter, Roboto, DM Sans, Nunito, Poppins, and any font that appears in "Top 10 Google Fonts" listicles.
- Excellent free sources: Fontsource, Google Fonts (but pick obscure gems), Bunny Fonts, Adobe Fonts (if available).
- Strong pairings to explore: a high-contrast serif (Playfair, Cormorant, Libre Baskerville) with a geometric sans; an editorial grotesque (Neue Haas Grotesk, Aktiv Grotesk) with a slab; a display script with a neutral mono.
- Scale drastically. Hero headlines at `clamp(5rem, 12vw, 12rem)` — or bigger. Don't be timid.
- Treat line-height and letter-spacing as design decisions, not defaults. Tight tracking on large headlines (`letter-spacing: -0.04em`). Generous leading on body (`1.7`–`1.9`).
- Use `font-feature-settings` for ligatures, old-style numerals, and small caps where appropriate.
- Typographic hierarchy must be obvious without colour — if it collapses when greyscaled, fix it.

```css
/* Example: A strong typographic foundation */
:root {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Söhne', 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  --size-hero: clamp(4rem, 10vw, 11rem);
  --size-h2: clamp(2rem, 4vw, 4rem);
  --size-body: clamp(1rem, 1.2vw, 1.125rem);

  --leading-tight: 1.05;
  --leading-body: 1.75;
  --tracking-display: -0.03em;
}
```

---

## 2. Colour — Commit, Don't Compromise

**Palette principles:**
- Start with **one dominant hue** and one neutral. Add a single accent that creates tension.
- Dark-mode-first when the content is editorial, immersive, or technical. Light-mode-first when the content is natural, product-led, or human.
- Avoid: blue-on-white SaaS default, purple gradient on white, teal startup, "clean" grey monotone.
- Excellent directions: warm off-white (`#F5F0E8`) + near-black + a single vivid accent; deep forest green + cream + copper; near-black + dusty rose + sand; electric yellow + black brutalism.
- Use CSS custom properties. Never hardcode a hex outside `:root`.
- Colour must do work: establish hierarchy, signal interactivity, and create atmosphere — not just decorate.

```css
:root {
  /* Pick ONE of these directions and delete the others */

  /* Direction A: Warm editorial */
  --bg: #F5F0E8;
  --fg: #1A1714;
  --accent: #C84B31;
  --muted: #8B8077;

  /* Direction B: Dark immersive */
  --bg: #0E0E0E;
  --fg: #F0EDEA;
  --accent: #E8C547;
  --muted: #555550;

  /* Direction C: Cold precision */
  --bg: #F0F2F5;
  --fg: #0D1117;
  --accent: #2563EB;
  --muted: #6E7681;
}
```

---

## 3. Layout & Spatial Composition

**Think in planes, not boxes.**

- Use CSS Grid for page-level layout. Break the grid intentionally at least once per section.
- Overlap elements across grid lines. Layer content over imagery. Let text bleed into negative space.
- Asymmetry creates tension and interest. Centred layouts must earn their symmetry.
- Generous whitespace is a design element, not emptiness. Use `padding` as breath.
- Horizontal rhythm: establish a baseline grid (`line-height` multiple) and stick to it.
- Sticky elements, overlapping panels, pinned sections — use position for spatial storytelling.

```css
/* Example: A grid that allows controlled rule-breaking */
.layout {
  display: grid;
  grid-template-columns: [edge-start] 1fr [main-start] minmax(0, 80ch) [main-end] 1fr [edge-end];
  /* Elements can step outside main with grid-column: edge-start / edge-end */
}

/* Deliberate overlap */
.hero-image {
  grid-column: edge-start / edge-end;
  margin-top: -10vh; /* Pulls image up over previous section */
}
```

---

## 4. Motion — Purposeful, Not Decorative

Motion should feel like the interface is alive, not performing.

**Principles:**
- Every animation must serve communication: entrance (focus), feedback (response), transition (continuity), or atmosphere (presence).
- Ease is personality. `cubic-bezier(0.16, 1, 0.3, 1)` (Expo out) for snappy reveals. `cubic-bezier(0.87, 0, 0.13, 1)` (Expo in-out) for considered transitions. Avoid `ease-in-out` defaults.
- Stagger entrances: `animation-delay: calc(var(--i) * 80ms)` creates choreography without JS.
- Scroll-linked animations (via `IntersectionObserver` or CSS `@scroll-timeline`) should reveal content as if lifting a curtain — not bouncing elements in randomly.
- Hover states should respond instantly (0ms delay) but animate gracefully (200–400ms duration).
- Respect `prefers-reduced-motion`. Wrap all decorative animations:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Signature motion patterns from reference sites:**
- **Clip-path reveals**: Text or images revealed by an expanding `clip-path` (seen in floema.com, amardenvox.com).
- **Parallax depth**: Background layers moving at different scroll speeds to create spatial depth.
- **Character-by-character text animation**: Individual letters staggered with `animation-delay`.
- **Smooth page transitions**: Fade or slide transitions between route changes.
- **Magnetic hover**: Elements subtly attracted to cursor position (JS required; use sparingly).

---

## 5. Detail Work — Where Good Becomes Great

The difference between a decent site and an Awwwards winner is accumulated detail.

**Checklist of high-leverage details:**
- [ ] Custom scrollbar styled to match the palette
- [ ] Focus styles that are beautiful, not just visible
- [ ] `::selection` colour matches the accent
- [ ] Cursor customised where meaningful (pointer for interactive, crosshair for creative tools)
- [ ] Images use `object-fit: cover` with a considered `object-position`
- [ ] Loading states are designed, not afterthoughts
- [ ] Empty states have personality
- [ ] Transitions on all interactive elements (even `color` and `background-color` changes)
- [ ] `font-variant-numeric: oldstyle-nums` on running text with numbers
- [ ] Responsive type with `clamp()` — no jarring jumps between breakpoints
- [ ] `aspect-ratio` used instead of padding-top hacks
- [ ] `will-change` applied surgically to animated elements (not globally)

---

## 6. Component Patterns

### Hero Section
The hero is the brand. It must answer: *who*, *what*, and *why care* — in that order, in under 3 seconds.
- Full-viewport height, or deliberately broken (e.g., 85vh) to imply more below.
- The headline is the largest element. No competition.
- One CTA. Not two. One.
- Movement: even a subtle parallax or text entrance earns attention.

### Navigation
- Fixed or sticky nav should collapse gracefully. Avoid the floating-card-with-blur trend unless it genuinely suits the aesthetic.
- Mobile nav: full-screen overlay with large type is almost always better than a drawer with small links.
- Active states must be unambiguous.

### Cards & Grids
- Cards should have personality: unusual aspect ratios, overlapping metadata, typographic-only variants.
- Hover on cards: avoid `box-shadow` growth as the only effect. Try `transform: scale(1.02)`, clip-path changes, colour shifts, or revealed text.

### Buttons & CTAs
- Primary button: strong, solid, obvious.
- Secondary: outlined or ghost — must still feel intentional.
- Micro-interaction on click: even a 100ms `scale(0.97)` transform confirms the action.
- Never use rounded pills (`border-radius: 9999px`) unless the brand is explicitly soft/friendly.

---

## 7. Performance Considerations

Beautiful and fast are not in conflict.

- Use `font-display: swap` on all web fonts. Preload the most critical font file.
- Images: use `<picture>` with WebP/AVIF sources. Set `loading="lazy"` on below-fold images.
- Animations: prefer `transform` and `opacity` — they don't trigger layout or paint.
- CSS: avoid `@import` chains. Use custom properties to eliminate repetition.
- Avoid heavy JS animation libraries when CSS can achieve the same effect.

---

## 8. Reference Aesthetic Profiles

When the user doesn't specify a direction, these profiles map to common project types. Choose the closest match and adapt:

| Project Type | Aesthetic Direction | Key Moves |
|---|---|---|
| Agency / Studio | Confident editorial, dark | Large type, grid-breaking layout, clip-path reveals |
| Luxury product | Restrained, warm, tactile | Serif display, generous whitespace, slow parallax |
| Tech / SaaS | Precise, cool, kinetic | Geometric sans, data visualisation, interactive demos |
| Portfolio | Personal, distinctive | Bold typographic choice, unexpected colour, personality-first |
| E-commerce | Editorial-product hybrid | Oversized imagery, clean typographic hierarchy, fast hover |
| Cultural / Arts | Expressive, layered | Mixed media, collage-like composition, unconventional navigation |

---

## 9. Anti-Patterns — Never Do These

These are the marks of a generated, template site:

- ❌ Hero with gradient background + centred headline + subtitle + two buttons
- ❌ Feature grid of 3 or 6 icons with short descriptions in grey text
- ❌ Testimonials in a horizontal carousel with star ratings
- ❌ Footer with 4 link columns and a newsletter field
- ❌ `box-shadow: 0 4px 20px rgba(0,0,0,0.1)` on every card
- ❌ Purple/indigo gradient on white as "modern" or "tech"
- ❌ Inter or DM Sans as the primary typeface
- ❌ Rounded rectangle cards with padding that looks identical to every Bootstrap site
- ❌ Animations that trigger on every scroll event (performance and nausea)
- ❌ Hamburger menu on desktop
- ❌ Placeholder image services (use CSS gradients or descriptive `alt` attributes instead)

---

## 10. Output Format

Always produce:
1. **A brief design rationale** (3–5 sentences): the aesthetic direction chosen, the typeface decision, the colour logic, and the key spatial or motion device.
2. **Complete, working code**: HTML/CSS/JS in a single file unless the project warrants splitting. No placeholder comments like `/* add your styles here */`. Every line should be real.
3. **What to change next**: one or two suggestions for what a human designer would refine or expand.

The code must run in a browser without build tools unless the user explicitly requests a framework.

---

## Quick-Start Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><!-- Project name --></title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <!-- Load your chosen font here -->
  <style>
    /* ─── Reset ─────────────────────────────────────── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    img, video { max-width: 100%; display: block; }

    /* ─── Custom Properties ──────────────────────────── */
    :root {
      --bg: ;          /* Define your background */
      --fg: ;          /* Define your foreground */
      --accent: ;      /* Define your accent */
      --muted: ;       /* Define your muted text */

      --font-display: ;
      --font-body: ;

      --size-hero: clamp(3.5rem, 9vw, 10rem);
      --size-h2: clamp(2rem, 4vw, 3.5rem);
      --size-body: clamp(1rem, 1.2vw, 1.125rem);
    }

    /* ─── Base ───────────────────────────────────────── */
    body {
      background: var(--bg);
      color: var(--fg);
      font-family: var(--font-body);
      font-size: var(--size-body);
      line-height: 1.75;
      -webkit-font-smoothing: antialiased;
    }

    /* ─── Reduced motion ─────────────────────────────── */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* ─── Your styles below ──────────────────────────── */
  </style>
</head>
<body>
  <!-- Your markup here -->
  <script>
    // IntersectionObserver for scroll reveals
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => {
        if (el.isIntersecting) el.target.classList.add('visible');
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  </script>
</body>
</html>
```

---

## Reference Sites to Study

When seeking inspiration or validating a direction, these represent the aesthetic standard:

- **awwwards.com** — Current SOTD winners for what the industry considers excellent right now
- **offmenu.design** — AI-native studio; clean, purposeful, kinetic
- **floema.com** — Product brand with editorial sensibility; refined, nature-forward
- **amardenvox.com** — Portfolio; bold typographic confidence
- **matter.com** — Ambitious brand with spatial depth and motion
- **enerblock.net** — Industrial/energy sector done with genuine craft

Study what they do with the first viewport: that's where character is established or lost.
