# Personal Website

A personal portfolio, blog, and creative showcase built with Astro, React Three Fiber, and Tailwind CSS. Features an immersive 3D organic terrain hero, bioluminescent particles, and smooth interactions.

## Tech Stack

- **Astro** — Static-first, island architecture
- **React Three Fiber** — Declarative 3D (Three.js)
- **Tailwind CSS** — Utility-first styling with custom theme
- **MDX** — Rich content authoring for blog and projects
- **Vercel** — Edge deployment

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── three/       # React Three Fiber 3D components
│   └── ui/          # Shared UI components
├── content/
│   ├── blog/        # MDX blog posts
│   └── projects/    # Project entries
├── layouts/         # Page layouts
├── lib/             # Utilities
├── pages/           # Routes
└── styles/          # Global CSS + prose
```

## Adding Content

### Blog Posts

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
description: "A brief description"
date: 2026-05-05
tags: ["tag1", "tag2"]
---

Your content here...
```

### Projects

Create a new `.mdx` file in `src/content/projects/`:

```mdx
---
title: "Project Name"
description: "What it does"
tags: ["Tech1", "Tech2"]
liveUrl: "https://..."
sourceUrl: "https://github.com/..."
featured: true
order: 1
---

Project details...
```

## Deployment

Connected to Vercel for automatic deployments:
- Push to `main` → production deploy
- Open a PR → preview deploy

## License

MIT
