---
name: deployment-notes
description: "Vercel deployment plan for Color Generator, PollyGlot, root hub — build commands, env vars, blockers"
metadata: 
  node_type: memory
  type: project
  originSessionId: 3f880575-e838-4d7a-84a2-999832a82557
---

Planned Vercel deployment to share portfolio projects with peers, family, and potential clients.

**Why:** Mike wants shareable URLs rather than pointing people to the GitHub Pages learning hub. Vercel is the chosen platform. Deployment is planned as a separate dedicated chat.

**How to apply:** When the Vercel deployment chat begins, use these configs as the starting point.

---

## 1. Root Learning Hub (`/`)

- **Stack**: Vite 8 static build
- **Build command**: `npm run build && cp -r courses dist/ && cp -r images dist/ && cp -r templates dist/`
- **Output directory**: `dist/`
- **Root directory** (in Vercel): `/`
- **Config**: `vercel.json` at repo root sets buildCommand and outputDirectory — committed 2026-05-24
- **Env vars**: None needed
- **Blockers**: None — deployed; `vercel.json` fix resolved 404s on all subproject links
- **App domain (stable)**: [fullstack-path-scrimba.vercel.app](https://fullstack-path-scrimba.vercel.app/)
- **Deployment domain**: [fullstack-path-scrimba-9d580egnd-sobhy0101s-projects.vercel.app](https://fullstack-path-scrimba-9d580egnd-sobhy0101s-projects.vercel.app)

---

## 2. Color Generator (`courses/09-apis-and-async-js/02-blog-space/solo-project-color-generator/`)

- **Stack**: Vite 7.x + Firebase Realtime Database + Firebase Auth
- **Build command**: `npm run build`
- **Output directory**: `dist/`
- **Root directory** (in Vercel): `courses/09-apis-and-async-js/02-blog-space/solo-project-color-generator`
- **Env vars needed**: Firebase config (exposed as `VITE_FIREBASE_*` for Vite to inline)
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_DATABASE_URL`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
- **Blockers**: Verify `src/js/firebase/config.js` reads from `import.meta.env.VITE_*` (not hardcoded keys)

---

## 3. PollyGlot (`courses/10-ai-engineering/solo-project-pollyglot/`)

- **Stack**: Vanilla HTML/CSS/JS frontend + Vercel serverless function (`api/translate.js`)
- **Build command**: None (vanilla static)
- **Root directory** (in Vercel): `courses/10-ai-engineering/solo-project-pollyglot`
- **Env vars needed**:
  - `OPENAI_API_KEY` — stored in Vercel env vars, read server-side only
- **Blockers**:
  1. `api/translate.js` does not exist yet — needs to be created as a Vercel serverless function
  2. `USE_MOCK_DATA = true` in `script.js:9` — must be set to `false` before deploying live
  3. The `api/translate.js` function needs to proxy the OpenAI call with the server-side API key
- **Budget**: ~$0.12 estimated for development + testing on gpt-3.5-turbo

---

## Recommended deploy order

1. Root hub first (zero blockers, proves the Vercel workflow)
2. Color Generator (one check on Firebase config)
3. PollyGlot last (requires building the serverless function first)
