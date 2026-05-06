# Requirements: Personal Website

> Author: Product Manager (Marty)
> Date: 2026-05-05
> Status: Draft — awaiting user approval

## Problem Statement

The user needs a personal website that serves as a portfolio, blog, and creative showcase. The site must make a strong first impression — visitors should feel a sense of craft and delight ("woah" factor). It needs to stand out from typical developer portfolios through distinctive visual design, 3D animations, and polished interactions.

## Users

| User | Need |
|------|------|
| Potential employer / recruiter | Quickly assess skills, see projects, get contact info |
| Collaborator / peer developer | Explore projects in depth, read technical writing |
| General visitor / reader | Enjoy the blog, experience the craft of the site itself |
| Site owner (you) | Easy to update content (blog posts, projects), low maintenance |

## Success Metrics

| Metric | Target |
|--------|--------|
| Time to "woah" | < 3 seconds from first paint — visitor sees something visually striking immediately |
| Bounce rate | < 40% — visitors explore beyond the landing page |
| Blog publishability | New post live in < 5 minutes from writing |
| Lighthouse performance | > 85 on mobile (balancing rich visuals with speed) |
| Accessibility | WCAG 2.1 AA compliance (animations respect reduced-motion) |

## Functional Requirements

### FR-1: Landing / Hero Experience
- **When** a visitor loads the site, **the system shall** display an immersive 3D animated hero with organic, nature-inspired aesthetics that communicates identity and craft.
- **While** 3D assets are loading, **the system shall** display a branded loading animation that feels intentional and engaging (not a generic spinner).
- **When** the visitor scrolls or interacts, **the system shall** respond with fluid, physics-aware transitions that reward exploration.
- The hero **shall** include the user's name, a brief tagline, and clear navigation entry points.

### FR-2: About Section
- **The system shall** present a personal narrative — who you are, what you do, what drives you.
- **The system shall** include a professional photo or stylized avatar.
- **When** the visitor scrolls into the About section, **the system shall** animate content in with purposeful motion (not generic fade-ins).

### FR-3: Projects Section
- **The system shall** display projects as visually rich cards or tiles with thumbnail/preview, title, short description, and tech stack tags.
- **When** a visitor hovers or focuses a project card, **the system shall** provide a 3D or depth-based interaction effect.
- **When** a visitor selects a project, **the system shall** navigate to a detail view with: extended description, screenshots/demo, links to live site and source code, role and contributions.
- Projects **shall** be filterable by technology or category.

### FR-4: Blog
- **The system shall** display blog posts in reverse chronological order with title, date, reading time, and excerpt.
- **When** a visitor selects a post, **the system shall** render the full post with: proper typography, syntax-highlighted code blocks, responsive images, and estimated reading time.
- The blog **shall** support MDX or Markdown authoring for easy content creation.
- **The system shall** provide an RSS feed.

### FR-5: Navigation & Layout
- **The system shall** provide persistent navigation accessible from any page.
- Navigation **shall** include smooth transitions between sections/pages.
- **The system shall** be fully responsive: desktop, tablet, and mobile.
- **When** on mobile, **the system shall** adapt 3D elements to maintain performance (reduce complexity or substitute 2D alternatives).

### FR-6: Contact / Footer
- **The system shall** display contact links (email, GitHub, LinkedIn, Twitter/X — configurable).
- **The system shall** include a footer with copyright and social links.

### FR-7: Theming
- **The system shall** support dark mode as the default theme.
- **When** a visitor toggles the theme, **the system shall** switch between dark and light modes with a smooth transition.
- 3D elements **shall** adapt their lighting/materials to the active theme.

## Non-Functional Requirements

| NFR | Requirement |
|-----|-------------|
| Performance | Total bundle < 500KB gzipped (excluding lazy-loaded 3D assets). 3D assets loaded progressively with a branded loading animation — site feels intentional during load, not broken. Perceived performance prioritised over raw FCP. |
| Accessibility | WCAG 2.1 AA. All animations respect `prefers-reduced-motion`. All interactive elements keyboard-navigable. Semantic HTML throughout. |
| SEO | Meta tags, Open Graph, structured data for blog posts. Sitemap.xml. |
| Maintainability | Content (blog posts, projects) managed as flat files (Markdown/MDX + frontmatter). No CMS dependency. |
| Hosting | Static site deployable to Vercel or GitHub Pages. No server runtime required. |
| Browser support | Latest 2 versions of Chrome, Firefox, Safari, Edge. Graceful degradation for older browsers (3D falls back to static). |

## In Scope

- Landing hero with 3D animation
- About section with narrative + photo
- Projects section with cards, filtering, detail pages
- Blog with MDX, syntax highlighting, RSS
- Dark/light theme toggle
- Responsive design (mobile-first)
- Reduced-motion accessibility
- Static deployment (Vercel or GitHub Pages)
- SEO fundamentals

## Out of Scope (Deferred)

- Contact form with backend (use mailto: link for now)
- CMS integration (content is file-based)
- Analytics dashboard (can add later with Plausible/Fathom)
- Internationalization
- Comments on blog posts
- Search functionality
- Newsletter signup

## Constraints

- No server-side runtime — must be fully static or SSG
- 3D must not block page usability — progressive enhancement pattern
- Must be deployable by a single person with no ops overhead

## Resolved Questions

1. **3D aesthetic:** Organic / nature-inspired (not geometric or retro).
2. **Content:** Starting fresh — no migration needed.
3. **Color palette:** Designer proposes; user is flexible.
4. **Performance flexibility:** A branded loading animation is acceptable while 3D assets load. The site should feel intentional during loading, not broken. FCP target relaxed — prioritize perceived performance (engaging loader) over raw paint time.
