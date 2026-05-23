---
name: project_scrimba_repo
description: "Overview of Mike's Scrimba Fullstack Path learning repo — course progress, structure, and conventions"
metadata: 
  node_type: memory
  type: project
  originSessionId: 6f229210-0df5-45b5-a6f4-3af0dd1dbc1b
---

This is a public learning-diary repository tracking Mike Sobhy's progress through the [Scrimba Fullstack Developer Path](https://scrimba.com/fullstack-path-c0fullstack). It is hosted on GitHub Pages at `sobhy0101.github.io/fullstack-path-scrimba/`.

**Course progress as of May 2026:**
- Courses 01–09: ✅ Completed
- Course 10 (AI Engineering): 🚧 Paused at ~52% (reached RAG & vector databases; solo project PollyGlot built)
- Course 11 (Node.js): 🚧 Just started (May 23 2026)
- Courses 12–19+: 🔒 Not started

**Why:** Mike chose to continue the backend track (Node.js first) rather than finishing AI Engineering; he may return to course 10 later.

**How to apply:** When suggesting next steps or updating progress indicators, reflect this ordering (Node.js is the active course, not AI Engineering).

**Repo structure:**
- `index.html` + `styles.css` — root landing page with course cards
- `courses/<NN>-<slug>/` — one folder per course (note: `06-essenntial-css` has a typo — double-n — and `11-node.js` uses a dot, not a hyphen)
- `templates/shared-styles.css` — shared nav/mobile-menu styles
- `images/` — favicons, icons, social preview
- Vite is the dev server (`npm run dev`)

**Instructor for Node.js course:** Tom Chant
