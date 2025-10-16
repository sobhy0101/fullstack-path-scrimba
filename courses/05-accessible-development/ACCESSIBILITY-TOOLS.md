# Accessibility Tools and Workflow

This document lists recommended editor extensions, browser tools, automated checks, and commands to help you find and fix accessibility problems while you code.

## VS Code extensions (install these for live reminders)

- Accessibility Insights for Web (Microsoft)
  - Use for fast accessibility checks and guided fixes.
- axe DevTools (Deque) — VS Code extension
  - Runs axe-core checks inside the editor and surfaces issues inline.
- webhint (hinthub)
  - Hints for accessibility, performance, and best practices.
- Color Contrast Checker (any popular contrast extension)
  - Quick contrast checks on CSS values.
- ESLint (already in this project)
  - Use with `eslint-plugin-jsx-a11y` for JSX accessibility linting.

## Browser tools (run on rendered pages)

- axe DevTools (Chrome / Edge / Firefox extension)
- WAVE (Web Accessibility Evaluation Tool) extension
- Lighthouse (built into Chrome DevTools) — run Accessibility audit
- Accessibility Insights (browser extension)

## Automated / CI tools

- pa11y / pa11y-ci — page-level accessibility tests
- axe-core + axe-ci — integrate ax-core checks into CI
- webhint — can run in CI to provide accessibility hints

## Quick setup: ESLint + jsx-a11y (project-local)

Open PowerShell in the `05-accessible-development` folder and run:

```powershell
npm init -y
npm install --save-dev eslint eslint-plugin-jsx-a11y

# optional (TypeScript/React projects):
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Then run ESLint interactively (optional):

```powershell
npx eslint --init
```

This folder includes a starter `.eslintrc.json` that turns on `jsx-a11y` recommended rules and sets several rules to `warn`. You can tweak severities or add rules as needed.

## Reusable ESLint template

I added a reusable config template in the repo root (folder `eslint-config-accessible`) you can copy into future projects.

## Typical workflow

1. Keep a VS Code accessibility extension enabled while you code for instant warnings.
2. Run ESLint locally before committing to catch JSX/HTML issues.
3. Run axe or Lighthouse on the running page before marking a task done.
4. Add pa11y/axe-ci to CI to prevent regressions.

## Quick checklist for each page/component

- Semantic HTML used? (`<main>`, `<nav>`, headings in order)
- Images have `alt` attributes.
- Links are keyboard-focusable and have accessible names.
- Interactive elements have keyboard handling and focus styles.
- Color contrast meets WCAG AA (use contrast extension or Lighthouse).

## Where to learn more

- axe DevTools Documentation: [https://www.deque.com/axe/](https://www.deque.com/axe/)
- Accessibility Insights: [https://accessibilityinsights.io/](https://accessibilityinsights.io/)
- webhint: [https://webhint.io/](https://webhint.io/)
