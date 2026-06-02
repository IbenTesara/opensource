---
name: ibenvandeveire-accessibility
description: >-
  Accessibility expectations for @ibenvandeveire Angular packages (W3C/WAI).
  Use when implementing ngx-layout, ngx-inform, ngx-forms, or other packages
  that require labels, ARIA roles, or user-provided a11y setup.
---

# @ibenvandeveire — accessibility

Many packages enforce accessibility setup and **fail at runtime** if required labels, roles, or IDs are missing. Components alone do not make an app accessible.

## Rules for agents

1. **Read package docs first** — each feature lists mandatory inputs (e.g. modal `label` / `labelledById`, tour `#stepTitle`, tooltip unique `ngxTooltipId`).
2. **Do not strip a11y** to “fix” errors; add the missing markup or configuration.
3. **Prioritize a11y bugs** over new features when the user reports WCAG issues.
4. **ngx-inform** — modals enforce WCAG/ARIA; CDK options that break compliance are disabled.
5. **ngx-layout** — treegrid, accordion, configurable layout (drag-and-drop service), display content set `aria-live` / `aria-busy` where documented.
6. **Image marker** — MarkerJs2/MarkerLive lack keyboard support; document limitations for users.

## When unsure

Consult the matching skill under `opensource-wiki/skills/<package>/` or the wiki `.md` file in `opensource-wiki/`.
