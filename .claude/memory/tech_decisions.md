---
name: tech-decisions
description: "npm audit patterns, uuid overrides, Vite 8 upgrade — security maintenance decisions and rationale"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3f880575-e838-4d7a-84a2-999832a82557
---

**Use npm `overrides` to fix nested vulnerable transitive deps — not patch-package, not manual code edits.**

When a transitive dependency has a vulnerability that the parent package hasn't patched (e.g., `uuid@10.0.0` nested inside `@langchain/langgraph`), add an `overrides` field to `package.json` to force the whole tree to use a safe version:

```json
"overrides": {
  "uuid": "^14.0.0"
}
```

Then run `npm install`. npm deduplicates and shares the forced version across all nested packages.

**Why:** The only alternative npm audit offered was downgrading `langchain` from v1.x to v0.3.x — a regression, not a fix. The Dependabot alert showed the actual source-level fix (a bounds check `if` statement in uuid), but applying that manually via `patch-package` requires re-applying the patch after every `npm install` and updating it when uuid itself changes. Overrides is self-maintaining.

**How to apply:** When `npm audit fix --force` says "Will install X@Y.Z, which is a breaking change" and that change would downgrade a direct dependency, check if the real vulnerability is in a nested transitive dep. If yes, use overrides instead.

---

**Vite 8 upgrade (root project)**

Root was on Vite 7.x (vulnerable: path traversal, server.fs.deny bypass, arbitrary file read via WebSocket). Upgraded to Vite 8.0.14 via `npm audit fix --force`. Package.json now has `"vite": "^8.0.14"`. The original spec was `"vite": "latest"` so v8 was already the intended target.

**Why:** The color-generator sub-project (spec `"vite": "^7.3.0"`) could patch within v7 via a regular `npm audit fix`. The root needed `--force` because `"latest"` resolves to v8 in the registry but the lockfile had pinned v7.

---

**Waiting for upstream to fix nested deps is not the right answer.**

User tried waiting over a month for langchain to publish patched packages; they did not. Proactively apply overrides instead of waiting.
