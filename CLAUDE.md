# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Installation
```bash
pnpm install
```

For E2E testing setup:
```bash
npx playwright install
```

### Development Server
```bash
pnpm dev              # Standard development server
pnpm wrangler dev     # Development with Cloudflare Workers integration
```

### Build and Quality Checks
```bash
pnpm build            # Production build
pnpm check            # Type checking with svelte-check
pnpm lint             # Prettier + ESLint checks
pnpm format           # Auto-format code with Prettier
pnpm 1                # Quick quality check: format + (lint & check)
```

### Testing
The project follows a comprehensive testing strategy:
- **Unit tests**: Vitest (`pnpm test:u`)
- **Component tests**: Playwright (`pnpm test:c`) 
- **E2E integration tests**: Playwright (`pnpm test:i`)
- **All tests**: `pnpm tests` (runs all test suites in parallel)

#### Test Development
```bash
npx playwright codegen http://localhost:5173/  # Generate test code by recording interactions
npx playwright show-report                     # View test reports
```

### Cloudflare Workers Deployment
```bash
cp wrangler.toml.example wrangler.toml  # Setup local config
pnpm wrangler publish                    # Deploy to production
pnpm wrangler publish --dry-run          # Dry run deployment
pnpm wrangler tail usuyuki-portfolio-v6  # Tail production logs
```

## Architecture Overview

This is a **SvelteKit portfolio application** deployed on **Cloudflare Workers** with SSR. The site showcases personal work and integrates with external content sources.

### Key Technologies
- **SvelteKit 2.x** with Svelte 5 for the framework
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Cloudflare Workers** adapter for SSR deployment
- **Vite** for build tooling
- **pnpm** as package manager

### Content Integration
- **Ghost CMS** integration via `@tryghost/content-api` for blog content
- **Notion API** integration via `@notionhq/client` for dynamic content
- Both adapters are in `src/lib/utils/adapter/`

### Component Architecture
The project follows atomic design principles:

```
src/lib/components/
├── atom/           # Basic UI elements (buttons, text, frames)
├── molecule/       # Composed components (menus, footers, timelines)
└── animations/     # Animation components organized by complexity
```

### Route Structure
```
src/routes/
├── +layout.svelte           # Global layout with ScreenFrame, CircleMenu, Footer
├── +page.svelte             # Homepage
├── about/                   # About page
├── works/programming/       # Programming portfolio with dynamic [id] routes
├── works/slides/            # Presentation portfolio
├── works/videos/            # Video portfolio
├── api/counter/             # API endpoint for access counting
└── [other pages]/           # Additional static/dynamic pages
```

### State Management
- Uses SvelteKit's built-in stores
- Custom stores in `src/lib/stores/` for menu state
- Server-side data loading via `+page.server.ts` files

### Environment Configuration
Required environment variables for content APIs:
- `GHOST_API_URL` and `GHOST_CONTENT_KEY` for Ghost CMS
- `NOTION_API_KEY` for Notion integration

Both are accessed via `$env/static/private` in adapter files.