# Victory Co — OSRS Clan Website

Public-facing website for **Victory Company**, an Old School RuneScape clan focused on PvM, events, and community.

## Features

- **Landing Page** — Recruitment-focused story scroll with clan info, activities, and join requirements
- **Boss KC Leaderboards** — Top 10 kill counts across all 67 WOM-tracked bosses, organized by category (raids, bosses, slayer, wilderness, minigames)
- **Ranks** — Points leaderboard (all time, monthly, weekly), rank ladder with all 11 clan ranks, and full breakdown of how points are earned
- **Gallery** — Screenshot gallery powered by Discord, automatically synced from the `#clan-pics` channel

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL

## Development

```bash
npm ci
cp .env.example .env.local  # fill in values
npm run dev
```

Requires a PostgreSQL database. Seed mock data with:

```bash
npx tsx scripts/seed.ts
```

## Boss Sprites

Boss images are sourced from the [OSRS Wiki](https://oldschool.runescape.wiki/) under [CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/).

## License

All rights reserved.
