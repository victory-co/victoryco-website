# Victory Co Website — Design Spec

## Overview

Public-facing website for Victory Company, an OSRS clan. Serves as a recruitment and community identity site: landing page, boss KC leaderboards, and a screenshot gallery. Deployed on Railway as a single service, repo is public on GitHub.

## Tech Stack

- **Framework:** Next.js (App Router) with React
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL on Railway (new instance, separate from clan manager)
- **Hosting:** Railway (same project as clan manager, private network communication)
- **Language:** TypeScript

### Why Next.js

- App Router provides built-in API route handlers that serve as the proxy layer — no separate backend service needed
- SSR/SSG for leaderboard pages (indexable, fast initial load)
- Single deployable unit on Railway
- SEO is "nice to have" and comes free with SSR

## Security Constraints

The GitHub repo is public. These are non-negotiable:

- No API keys, internal URLs, secrets, or infrastructure details in code, comments, or docs
- All sensitive config via environment variables on Railway
- `.env` files gitignored, `.env.example` shows key names only
- Generic code comments only (no backend route paths, data schemas, or auth details)
- Generic error messages surfaced to frontend (never pass through raw backend errors)
- Exact version pins in package.json (no `^` or `~`)
- `package-lock.json` always committed
- `.npmrc` with `ignore-scripts=true`
- Builds use `npm ci`, not `npm install`
- Minimize dependencies — use native APIs where possible

## Architecture

### Data Flow

```
Browser → Next.js API Routes → Clan Manager (private network) → PostgreSQL Cache
Browser → Next.js API Routes → Discord API → PostgreSQL Cache
Frontend ← Next.js Server Components ← PostgreSQL Cache
```

### API Proxy + Database Cache Pattern

The website never exposes the clan manager or Discord API to the browser. Instead:

1. **Sync jobs** run on a schedule (every 6-12 hours) that fetch data from the clan manager and Discord API
2. Data is **transformed into the website's own schema** and stored in the website's PostgreSQL database
3. **Frontend reads only from the cache database** — never from external sources directly
4. The cached data schema is fully decoupled from whatever the clan manager returns

This provides stronger separation than in-memory caching: even reading every line of the public repo reveals nothing about the clan manager's API shape, response format, or data model.

### Service Communication

- Website ↔ Clan Manager: Railway private network (`CLAN_MANAGER_BASE_URL` env var), authenticated with shared secret (`CLAN_MANAGER_API_TOKEN` env var), scoped to Victory Co's `CLAN_ID`
- Website ↔ Discord: Discord Bot API with a **dedicated bot** (separate from clan manager's bot), read-only permissions on `#clan-pics` channel only (`DISCORD_BOT_TOKEN`, `DISCORD_CHANNEL_ID` env vars)
- Website ↔ PostgreSQL: Standard `DATABASE_URL` env var

### Environment Variables

```
CLAN_MANAGER_BASE_URL=
CLAN_MANAGER_API_TOKEN=
CLAN_ID=
DISCORD_BOT_TOKEN=
DISCORD_CHANNEL_ID=
DISCORD_INVITE_URL=
WOM_GROUP_URL=
DATABASE_URL=
SYNC_SECRET=
```

## Pages

### 1. Home Page — Story Scroll Layout

Full-viewport hero section that scrolls into alternating text/image sections telling Victory Co's story. Recruitment-focused narrative flow.

**Sections (top to bottom):**

1. **Hero:** Victory Co logo (crowned skull + crossed swords), clan name, tagline ("PvM · Social · Raiding · Skilling · Events"), primary CTA (Join Discord), secondary CTA (View on WOM). Full viewport height.
2. **Who We Are:** Alternating text/image. "Founded by three friends with a shared vision: to build a clan that balances fun, learning, and community." Paired with a clan screenshot.
3. **What We Do:** Alternating text/image (opposite side). Activities overview — PvM, SOTW/BOTW, bingos, drop parties, movie nights. Paired with an event screenshot.
4. **Compete:** Alternating text/image. Leaderboard teaser — "Rise through the ranks" with a link to the boss leaderboard. Paired with a leaderboard preview or boss-themed image.
5. **Join CTA Footer:** Requirements (1250+ Total, 100+ Combat, Discord Required, Iron-Friendly), Join Discord button.

**Content for screenshots:** Pulled from the Discord gallery integration or manually curated static images to start.

### 2. Boss Leaderboard — `/leaderboards/bosses`

Displays top-10 kill counts per boss for all Victory Co members. Data sourced from clan manager (which syncs from WOM/hiscores daily).

**Layout:**

- Page header with title ("Boss KC") and subtitle
- Content organized by category, each with a section header
- **4 boss cards per row** (responsive: 3 on tablet, 2 on small tablet, 1 on mobile)
- Each boss card has:
  - **Banner:** Boss sprite/render image with boss name overlaid at the bottom
  - **Table:** Rank, Player (as clickable link), KC columns
  - Top 3 ranks visually distinguished (gold #1, silver #2, bronze #3)
  - 10 rows per boss

**Categories (in order):**

1. Raids KC (Chambers of Xeric, Theatre of Blood, Tombs of Amascut, Colosseum, etc.)
2. Boss KC (GWD bosses, Vorkath, Zulrah, Corp, Nex, Nightmare, etc.)
3. Slayer Boss KC (Alchemical Hydra, Cerberus, Kraken, Grotesque Guardians, etc.)
4. Wilderness Boss KC (Callisto, Venenatis, Vet'ion, Chaos Elemental, etc.)
5. Minigame Boss KC (Tempoross, Wintertodt, Zalcano, etc.)
6. Collection Log KC
7. Misc Boss KC

**Boss images:** Self-hosted OSRS boss sprites (sourced from OSRS Wiki, CC BY-NC-SA 3.0 — will need attribution). Stored in the repo's public assets.

**Data:** Mock data during development. Replaced with real data once clan manager endpoints are built.

### 3. Gallery — `/gallery`

Screenshot gallery populated from the `#clan-pics` Discord channel.

**Data source:**

- A dedicated Discord bot (read-only, minimal permissions) fetches messages with image attachments from the `#clan-pics` channel
- Sync job runs every 6-12 hours, stores image URLs and captions (message text) in the cache database
- Discord CDN attachment URLs include signed expiry params — the sync interval keeps them fresh

**Layout:**

- Responsive image grid (masonry or uniform)
- Lightbox view on click
- Caption from Discord message text (if any)
- Images load directly from Discord CDN (no need to re-host)

**Content management:** Post a screenshot in `#clan-pics` on Discord → it appears on the website within 6-12 hours. Moderate by deleting Discord messages.

## Navigation

Persistent top nav across all pages:

- **Logo/Home** (left)
- **Leaderboards** (links to `/leaderboards/bosses`)
- **Gallery** (links to `/gallery`)
- **Join Discord** CTA button (right)

## Visual Direction

The visual design will be developed during implementation using the frontend-design skill to avoid generic AI aesthetics. The design must:

- Match the intensity and character of the Victory Co logo (crowned skull, crossed swords, dark/gold palette)
- Feel premium and distinctive — not a template, not a SaaS dashboard
- Dark theme with gold/amber accents pulled from the logo
- OSRS-inspired without being cartoonish
- Mobile responsive
- Reference site for layout density (not visual style): Elysium OSRS (elysiumosrs.com)

Specific visual choices (typography, color palette, textures, spacing, animations) will be made during implementation to ensure they're cohesive and intentional rather than prescribed generically in a spec.

## Database Schema (Cache)

Minimal schema for caching external data. This is the website's own schema — intentionally decoupled from the clan manager's data model.

### Tables

**boss_leaderboard**
- `id` (serial PK)
- `boss_name` (text) — display name
- `boss_slug` (text) — URL-safe identifier
- `category` (text) — raids, boss, slayer, wilderness, minigame, collection_log, misc
- `boss_image` (text) — path to sprite asset
- `rank` (integer) — 1-10
- `player_name` (text) — RSN
- `kc` (integer) — kill count
- `synced_at` (timestamp) — when this data was last refreshed

**gallery_images**
- `id` (serial PK)
- `discord_message_id` (text, unique) — for dedup
- `image_url` (text) — Discord CDN URL
- `caption` (text, nullable) — message text
- `posted_at` (timestamp) — when the Discord message was sent
- `synced_at` (timestamp) — when this was last refreshed

### Sync Strategy

- Cron-style sync runs every 6-12 hours (configurable via env var or hardcoded)
- Leaderboard sync: fetches from clan manager, upserts all rows by `boss_slug + rank`
- Gallery sync: fetches recent messages from Discord channel, inserts new ones by `discord_message_id`, refreshes `image_url` for existing ones (to handle CDN expiry)
- Triggered via Next.js API route (e.g., `/api/sync/leaderboard`, `/api/sync/gallery`) called by Railway cron job or external scheduler
- Sync routes are protected with a shared secret (`SYNC_SECRET` env var) — requests without the correct token are rejected. This prevents public abuse since the repo is public and anyone can see the route paths
- If Discord CDN URLs expire before the next sync, images will break temporarily. The 6-12 hour sync interval is well within Discord's URL expiry window (typically 24+ hours), so this shouldn't happen in practice

## What's NOT In Scope

- Skills/Hiscores leaderboard (future — separate page at `/leaderboards/skills`)
- Points system leaderboard (future — separate page at `/leaderboards/points`)
- Events page (deferred — needs content management story for event entries + images)
- Gallery admin panel (moderation via Discord message deletion)
- Any admin/management functionality
- Member lists tying RSNs to Discord accounts
- Point calculation logic or ranking formulas
- Internal clan rules or disciplinary info

## File Structure

```
victory-co-website/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home (story scroll)
│   │   ├── layout.tsx                  # Root layout + nav
│   │   ├── leaderboards/
│   │   │   └── bosses/
│   │   │       └── page.tsx            # Boss KC leaderboard
│   │   ├── gallery/
│   │   │   └── page.tsx                # Screenshot gallery
│   │   └── api/
│   │       ├── leaderboard/
│   │       │   └── route.ts            # Serves cached leaderboard data
│   │       ├── gallery/
│   │       │   └── route.ts            # Serves cached gallery data
│   │       └── sync/
│   │           ├── leaderboard/
│   │           │   └── route.ts        # Triggers leaderboard sync
│   │           └── gallery/
│   │               └── route.ts        # Triggers gallery sync
│   ├── lib/
│   │   ├── db.ts                       # Database connection
│   │   ├── backend.ts                  # Clan manager client (generic names)
│   │   └── discord.ts                  # Discord API client
│   └── components/
│       ├── nav.tsx
│       ├── boss-card.tsx
│       ├── leaderboard-table.tsx
│       └── gallery-grid.tsx
├── public/
│   └── bosses/                         # Boss sprite images
├── .env.example
├── .npmrc
├── .gitignore
├── package.json
├── package-lock.json
└── next.config.js
```
