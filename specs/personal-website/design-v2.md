# Design V2: "Bioluminescent Abyss"

> Revision: 2026-05-06
> Trigger: User feedback — "this is not a SaaS product, it is a work of art"
> Status: Draft — awaiting user approval

---

## Design Philosophy (Revised)

**"You are diving into the deep."**

This is not a portfolio. It's an environment. The visitor doesn't browse — they descend. Every scroll takes them deeper. The site has one mode: dark. Not because dark mode is trendy, but because light doesn't reach the abyss.

**Principles (revised):**
1. **Commit to the metaphor** — the entire site is a descent into depth. Structure, color, motion all serve this.
2. **Nothing is decorative** — every visual element has a reason. The 3D isn't wallpaper; it IS the site.
3. **Tension and release** — quiet moments make the dramatic ones hit harder.
4. **One mode, one voice** — no toggle, no compromise. This is a point of view.

---

## Color Palette (Revised): "Abyssal"

No light mode. One palette. Unapologetic.

| Token | Value | Usage |
|-------|-------|-------|
| `--void` | `#030806` | True background — almost black with a hint of deep ocean |
| `--deep` | `#0a1210` | Elevated surfaces, cards |
| `--water` | `#0f1f1a` | Mid-depth surfaces |
| `--text` | `#d4e8df` | Primary text — cool white with green tint |
| `--text-dim` | `#5a7a6d` | Secondary text — like something fading into depth |
| `--biolum` | `#00ffa3` | Primary accent — electric bioluminescence |
| `--biolum-cyan` | `#00e5ff` | Secondary accent — cyan bioluminescence |
| `--biolum-purple` | `#b388ff` | Tertiary accent — rare, used sparingly for surprise |
| `--warm` | `#ff6b35` | Danger/heat accent — like a thermal vent. Very rare. |
| `--glow-green` | `rgba(0, 255, 163, 0.15)` | Green glow halos |
| `--glow-cyan` | `rgba(0, 229, 255, 0.1)` | Cyan glow halos |

**Key difference:** The old palette was "pleasant forest." This is "deep ocean at 3000m." The accents are ELECTRIC — they pop because everything around them is near-black. The contrast is extreme and intentional.

---

## Typography (Revised)

| Element | Font | Size | Weight | Notes |
|---------|------|------|--------|-------|
| Display / Hero | `Syne` | 5rem–8rem (fluid) | 800 | Geometric, bold, architectural. Makes a statement. |
| Headings | `Syne` | 2rem–3.5rem (fluid) | 700 | |
| Body | `Space Grotesk` | 1rem–1.125rem | 400 | Slightly technical feel — you're reading a creator's log |
| Code | `JetBrains Mono` | 0.875rem | 400 | |
| Accent text | `Syne` | varies | 400 italic | For pull quotes, emphasis |

**Why Syne:** It's bold, geometric, slightly unusual. It has personality. It says "I made a choice" not "I picked the first Google Font."

---

## Site Structure (Revised): The Descent

The site is ONE continuous scroll. No separate pages for About/Projects/Blog. The visitor descends through layers. Each layer is a depth zone.

```
SURFACE (0m)     → Hero: Name + 3D ocean surface with caustics
TWILIGHT (200m)  → About: Who you are, emerging from the dark
MIDNIGHT (1000m) → Projects: Bioluminescent creatures = your work
ABYSS (3000m)    → Blog: Deep thoughts from the deep
TRENCH (6000m)   → Contact: The deepest point. A single glowing beacon.
```

Individual blog posts and project details ARE separate pages (for SEO/shareability), but the main experience is the descent.

---

## Screen-by-Screen Specification (Revised)

### 1. Loading State

**Gone.** No loading screen. The 3D fades in progressively. The text is there immediately. The scene builds around the visitor — they watch it come alive. This is more engaging than waiting.

If 3D takes >2s: text is already readable, particles start appearing one by one (like eyes opening in the dark). The scene assembles itself.

---

### 2. SURFACE (Hero)

**The visitor arrives at the ocean surface at night.**

```
┌─────────────────────────────────────────────┐
│                                             │
│     [3D: Ocean surface — dark water,        │
│      moonlight caustics rippling,           │
│      subtle fog rolling across]             │
│                                             │
│                                             │
│         NICHOLAS HARRE                      │
│         (massive, Syne 800, tracked out)    │
│                                             │
│         I build things that                 │
│         make people feel something.         │
│                                             │
│                                             │
│         ↓ Dive                              │
│                                             │
└─────────────────────────────────────────────┘
```

**3D Scene:** Dark water surface. Not photorealistic — stylized. Caustic light patterns dance on the surface from a moon above. Subtle volumetric fog drifts. The water has a slight undulation (vertex displacement on a plane, similar to current terrain but with water shader).

**Key difference from V1:** The 3D isn't a background — it IS the hero. The text floats ON the water. The caustics play across the letters.

**Scroll behavior:** As visitor scrolls, the camera submerges. Water rises above the viewport. A transition effect (like water closing over you) leads to the next zone.

**Mouse interaction:** Cursor creates subtle ripples on the water surface (displacement follows cursor).

---

### 3. TWILIGHT (About)

**You've descended. Light is fading. Shapes emerge.**

```
┌─────────────────────────────────────────────┐
│  [Particles drift — sparse, dim]            │
│                                             │
│         [Photo — circular, with a           │
│          bioluminescent ring around it      │
│          that pulses slowly]                │
│                                             │
│         I'm a developer who believes        │
│         software should feel as good        │
│         as it works.                        │
│                                             │
│         [Text appears line by line          │
│          as you scroll, like it's           │
│          being revealed by a passing        │
│          light source]                      │
│                                             │
│  [Skill tags float like organisms —         │
│   they drift slightly, glow on hover]       │
│                                             │
└─────────────────────────────────────────────┘
```

**Key difference:** Text isn't just "there." It's revealed by scroll — like a flashlight sweeping across a wall in the dark. Each line illuminates as you reach it (opacity + slight y-translate, scroll-linked).

**Skill tags:** Not pills in a row. They FLOAT. Positioned semi-randomly, drifting with subtle motion like plankton. On hover, they glow brighter and pull toward center (magnetic effect).

---

### 4. MIDNIGHT (Projects)

**Deep now. This is where the creatures live. Your projects ARE the creatures.**

```
┌─────────────────────────────────────────────┐
│                                             │
│    [Project "creatures" float in 3D space]  │
│                                             │
│    Each project is a glowing organism:      │
│    - A central glowing core (thumbnail)     │
│    - Tendrils of light (connections/tags)   │
│    - Pulsing softly in the dark             │
│                                             │
│    [As you scroll, they drift closer]       │
│    [Hover: creature expands, reveals info]  │
│    [Click: full-screen takeover with        │
│     project details]                        │
│                                             │
└─────────────────────────────────────────────┘
```

**Key difference:** Projects aren't cards in a grid. They're organisms in a void. Each one is a glowing entity with its own subtle animation pattern. They exist in 3D space — some closer, some further. Scroll brings them toward you.

**Hover/Focus:** The organism expands. Its glow intensifies. Text appears around it (title, description, tags) like data readouts on a deep-sea submersible's HUD.

**Click:** Smooth transition to a detail page. The organism fills the screen, then resolves into the project content.

**Fallback (no WebGL):** CSS-only version — cards with animated gradient borders and glow effects. Still dramatic, just 2D.

---

### 5. ABYSS (Blog)

**The deepest thoughts live deepest.**

```
┌─────────────────────────────────────────────┐
│                                             │
│  [Depth indicator on the side: "3000m"]     │
│                                             │
│  Latest transmissions                       │
│  from the deep                              │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│  │ Hello World                         │   │
│  │ The first signal from the abyss.    │   │
│  │ 2026-05-05 · 3 min                 │   │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Posts have a sonar-ping entrance          │
│   animation — a ring of light expands       │
│   outward as each one appears]              │
│                                             │
└─────────────────────────────────────────────┘
```

**Blog post cards:** Bordered by a subtle animated gradient (the bioluminescent glow creeps around the border like a living thing). On hover, the glow accelerates.

**Entrance:** Each post card appears with a "sonar ping" — a ring of light expands outward from center, revealing the card. Staggered timing.

**Depth indicator:** A subtle vertical line on the left edge of the viewport with depth markers. It tracks scroll position. Purely atmospheric — tells the visitor how deep they are.

---

### 6. TRENCH (Contact)

**The deepest point. One light in the void.**

```
┌─────────────────────────────────────────────┐
│                                             │
│                                             │
│                                             │
│              [A single glowing orb          │
│               pulsing in the void]          │
│                                             │
│              Let's talk.                    │
│                                             │
│         [GitHub] [LinkedIn] [Email]         │
│         (icons appear one by one,           │
│          each with its own glow color)      │
│                                             │
│                                             │
│         [Tiny text at very bottom:]         │
│         "You've reached the bottom.         │
│          Not many do."                      │
│                                             │
└─────────────────────────────────────────────┘
```

**Key difference:** The footer isn't a footer. It's the culmination of the journey. Minimal. Dramatic. One glowing point of light in absolute darkness. The social links appear like creatures approaching from the dark.

---

## Navigation (Revised)

**No persistent nav bar.** The descent IS the navigation.

Instead:
- **Depth indicator** on the left edge — subtle, always visible. Shows current zone. Clickable to jump between zones.
- **Floating "surface" button** — appears after you've scrolled past the hero. A small glowing circle in the top-right. Click to return to surface. Like an emergency ascent.
- **On project/blog detail pages:** A "return to depth" link that takes you back to the main descent at the right position.

**Mobile:** Same depth indicator, but as a thin glowing line on the left edge. Tap to expand zone selector.

---

## Motion Principles (Revised)

| Principle | Implementation |
|-----------|---------------|
| **Everything breathes** | Nothing is static. Even "resting" elements have a subtle pulse or drift. The site is alive. |
| **Scroll = descent** | All motion is tied to scroll. The visitor controls the pace. No auto-playing animations that run without them. |
| **Reveal, don't load** | Content doesn't "appear" — it's revealed. Like a light passing over something that was always there. |
| **Glow > shadow** | No drop shadows anywhere. Light comes FROM elements, not falls ON them. Everything is self-luminous. |
| **Organic timing** | No linear easing. Everything uses spring physics or custom curves with overshoot. |
| **Sound of silence** | Generous negative space. Let the void breathe. Cramped layouts kill the atmosphere. |

---

## What Gets Removed

- ❌ Light mode / theme toggle
- ❌ Traditional nav bar
- ❌ Card-based project grid
- ❌ Standard blog list layout
- ❌ Generic footer
- ❌ "Safe" color palette
- ❌ Predictable section ordering
- ❌ Decorative-only 3D

## What Gets Added

- ✓ Single continuous descent experience
- ✓ 3D that IS the content (not behind it)
- ✓ Depth indicator as navigation
- ✓ Scroll-linked reveals (not intersection observer pop-ins)
- ✓ Bioluminescent organisms as project representations
- ✓ Sonar-ping animations
- ✓ Caustic water surface hero
- ✓ Atmospheric typography (Syne)
- ✓ Generous void/negative space
- ✓ A sense of journey and discovery

---

## Accessibility (Still Non-Negotiable)

Art doesn't mean inaccessible:

- `prefers-reduced-motion`: All animation stops. Content visible immediately. Depth indicator still works as navigation.
- Keyboard: Depth indicator zones are focusable. All interactive elements have focus rings (bioluminescent glow ring).
- Screen reader: Semantic sections with proper landmarks. 3D is `aria-hidden`. All content exists as text.
- Contrast: `#00ffa3` on `#030806` = 12.4:1 ratio. Exceeds AAA.
- The site is fully usable without 3D. The 3D is progressive enhancement over a beautifully styled dark page.

---

## Performance Strategy

- **3D loads progressively.** Text content is immediate (static HTML). 3D assembles around it.
- **One scroll container.** No route changes on the main page = no navigation jank.
- **Instanced meshes** for particles and project organisms.
- **Scroll-driven animations** via CSS `animation-timeline: scroll()` where supported, JS fallback.
- **Mobile:** Reduced particle count, simpler shaders, 2D glow effects replace 3D organisms.

---
