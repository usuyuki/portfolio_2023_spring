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
pnpm lint             # Biome lint checks
pnpm format           # Auto-format code with Biome
pnpm 1                # Quick quality check: format + (lint & check)
```

### Testing
The project follows a comprehensive testing strategy:
- **Unit tests**: Vitest (`pnpm test:u`)
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

### KV Cache Purge
Notion content is cached in Cloudflare KV (TTL up to 7 days). Purge it manually when stale or broken data is stuck:
```bash
./scripts/purge-cache.sh              # Purge all notion:* keys in production
./scripts/purge-cache.sh --dry-run    # List target keys without deleting
./scripts/purge-cache.sh --local      # Purge local (wrangler dev) KV
./scripts/purge-cache.sh --prefix notion:datasource:   # Narrow by prefix
```
The access counter (`counter`) is outside the `notion:` prefix and is never deleted. Requires `wrangler login` for production.

## Architecture Overview

This is a **SvelteKit portfolio application** deployed on **Cloudflare Workers** with SSR. The site showcases personal work and integrates with external content sources.

### Key Technologies
- **SvelteKit 2.x** with Svelte 5 for the framework
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Cloudflare** adapter for SSR deployment
- **Vite** for build tooling
- **pnpm** as package manager

### Content Integration
- **Ghost CMS** integration via the Content API, called with native `fetch` for blog content
  - The official `@tryghost/content-api` SDK is intentionally NOT used: it depends on axios, whose fetch adapter sends `cache: 'default'`, which Cloudflare Workers rejects with `Unsupported cache mode: default`. The failure is silent (the error is swallowed and the section renders empty), so do not reintroduce the SDK.
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
├── events/                  # Event pages (see "Event Pages" below)
├── api/counter/             # API endpoint for access counting
└── [other pages]/           # Additional static/dynamic pages
```

### Event Pages
Pages for events the author attends (Comiket, 技術書典, etc.).

Listing metadata and page content are deliberately split, because the listing needs a uniform card
structure while each event's detail page (お品書き etc.) does not generalize:

| Concern | Location |
| --- | --- |
| Listing metadata (slug / name / dates / thumbnail) | `src/lib/data/events.ts` |
| Listing page (hero + これから + これまで) | `src/routes/events/+page.svelte` |
| Listing classification (computed server-side only) | `src/routes/events/+page.server.ts` |
| Per-event detail page | `src/routes/events/{slug}/+page.svelte` |
| `/events/now` redirect | `src/routes/events/now/+page.server.ts` |

The listing picks the event closest to today as the hero, then splits the rest into これから /
これまで; a section with no events is omitted entirely (`classifyEvents`). Detail pages are static
directories rather than a `[slug]` dynamic route, so each event's layout can be written freely.

`/events/now` 302-redirects to whichever event is closest to today, past or future
(`findNearestEvent`) — a stable link that never needs updating per event. Note this differs from the
listing's hero, which prefers upcoming events over nearer past ones. With no events it returns 404.

**Dates are always JST.** Event dates (`YYYY/MM/DD`) are parsed as JST midnight in `parseEventDate`,
never with `new Date("YYYY/MM/DD")`, because Workers run in UTC and day boundaries would shift to
09:00 JST. Do not call `classifyEvents` inside the component: SSR and hydration would evaluate it at
different times/timezones and cause a hydration mismatch. Vitest pins `TZ=UTC` (same as Workers) so
timezone-dependent tests fail locally too.

**To add an event**: append an entry to `src/lib/data/events.ts` AND create
`src/routes/events/{slug}/+page.svelte`. `tests/unit/events.test.ts` fails if the two get out of
sync in either direction. Thumbnails go in `static/img/events/`; `thumbnail: null` renders a
placeholder. `now` is a reserved slug and cannot be used for an event.

### State Management
- Uses SvelteKit's built-in stores
- Custom stores in `src/lib/stores/` for menu state
- Server-side data loading via `+page.server.ts` files

### Environment Configuration
Required environment variables for content APIs:
- `GHOST_API_URL` and `GHOST_CONTENT_KEY` for Ghost CMS
- `NOTION_API_KEY` for Notion integration

Both are accessed via `$env/static/private` in adapter files.