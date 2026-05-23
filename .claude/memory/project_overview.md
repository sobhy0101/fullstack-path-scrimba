---
name: project-overview
description: "Scrimba fullstack monorepo — 11 courses, 3 Node.js sub-projects, course progress, deployable apps"
metadata: 
  node_type: memory
  type: project
  originSessionId: 3f880575-e838-4d7a-84a2-999832a82557
---

Repository: `fullstack-path-scrimba` — https://github.com/sobhy0101/fullstack-path-scrimba
Currently live at GitHub Pages: https://sobhy0101.github.io/fullstack-path-scrimba/

A learning journal / portfolio monorepo for the Scrimba Fullstack Path. The root `index.html` is a visual hub linking to each course section's own page.

**Why:** Mike is building toward a job-ready fullstack portfolio and wants to share progress with peers, family, and potential clients.

**How to apply:** When making changes, keep the course structure intact. The root `index.html` is the public-facing hub, not just a dev tool.

---

## Course Progress (as of May 2026)

| # | Section | Status |
|---|---|---|
| 01 | Introduction | ✅ Complete |
| 02 | HTML & CSS Fundamentals | ✅ Complete — includes "Visit Cairo" tourism solo project |
| 03 | JavaScript Fundamentals | ✅ Complete — Passenger Counter, Chrome Extension, Blackjack, Basketball Scoreboard, Unit Converter |
| 04 | Tools of the Trade | ✅ Complete — Git, GitHub, CLI, Geography Game |
| 05 | Accessible Development | ✅ Complete — Skynet rebuild, skip-nav, ARIA notes, Code Poetry |
| 06 | Essential CSS | ✅ Complete — NFT site, Portfolio, Coworking Space, Instagram Clone |
| 07 | Essential JavaScript | ✅ Complete — Cookie Consent, Meme App, X Clone, Food Ordering App, 20× mini projects |
| 08 | Responsive Design | ✅ Complete — Learning Journal solo project |
| 09 | APIs & Async JS | ✅ Complete — Bored Bot, Blog Space, Color Generator (solo), War Card Game, Dashboard |
| 10 | AI Engineering | 🚧 Paused at ~52% — Fundamentals, Dodgy Dave, RAG/Vector DBs, PollyGlot (solo) |
| 11 | Node.js | 🚧 In Progress (May 2026) — Wild Horizons API, Paranormal Encounters App (upcoming) |
| 12+ | Databases, Express, React, Next.js | 🔒 Upcoming |

---

## Projects with their own package.json

Three Node.js sub-projects exist inside the monorepo:

1. **Root** (`/`) — Vite 8 + LangChain + Supabase + Firebase + OpenAI + uuid 14
   - Build: `npm run build`
   - Dev: `npm run dev`

2. **Color Generator** (`courses/09-apis-and-async-js/02-blog-space/solo-project-color-generator/`)
   - Stack: Vite 7.x + Firebase Realtime Database
   - Features: Color palette generation, gradient builder, Firebase auth + library sync, clipboard copy, URL sharing, export
   - Build: `npm run build`

3. **eslint-config-accessible** (`eslint-config-accessible/`)
   - Shareable ESLint config with jsx-a11y accessibility rules
   - ESLint 8 (devDep only, no app to deploy)

---

## Deployable Solo Projects (Vercel target)

| Project | Location | Notes |
|---|---|---|
| Root learning hub | `/` | Static Vite build, no secrets |
| Color Generator | `courses/09/.../solo-project-color-generator/` | Needs Firebase env vars (VITE_FIREBASE_*) |
| PollyGlot | `courses/10-ai-engineering/solo-project-pollyglot/` | Vanilla JS + Vercel serverless fn for OpenAI. Currently `USE_MOCK_DATA = true` in script.js — must toggle to false before deploying live. Needs `OPENAI_API_KEY` in Vercel env vars. |

---

## Security Status (May 2026)

All 37 Dependabot vulnerabilities resolved:
- Root: 0 vulnerabilities. Fixed protobufjs (critical), flatted, langsmith, picomatch, postcss, ws, brace-expansion, vite (upgraded 7→8), uuid (14.0.0). Uses `"overrides": { "uuid": "^14.0.0" }` to force patched uuid in all langchain nested deps.
- Color Generator: 0 vulnerabilities.
- eslint-config-accessible: 0 vulnerabilities (lockfile created May 2026).

See [[tech-decisions]] for the uuid overrides rationale.
