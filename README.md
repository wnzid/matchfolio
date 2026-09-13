<div align="center">

# Matchfolio

**A local-first CV workspace with structured data, live previews, and regional templates.**

`React` · `TypeScript` · `Dexie` · `Express` · `Zod`

</div>

Matchfolio is a monorepo for creating and maintaining professional CVs. The current application keeps CV data in the browser through IndexedDB, validates documents with shared schemas, and renders editable previews with Australian and European template options.

## Current capabilities

- Create, edit, duplicate, search, sort, and delete CVs
- Autosave structured CV data locally in IndexedDB
- Edit personal details, summary, work, education, projects, skills, certifications, languages, interests, and references
- Preview CVs through a template registry
- Shared Zod schemas across client and server packages
- Responsive application shell and tested editor flows
- Small Express service with a health endpoint

> The Gemini tailoring files are scaffolding only: the current server does not expose a CV-tailoring route. This README describes shipped behavior rather than the intended roadmap.

## Monorepo layout

```text
apps/client/       React/Vite CV library, editor, templates, and IndexedDB
apps/server/       Express API foundation
packages/shared/   CV, job, and tailoring schemas
```

## Run locally

Node.js 20 or newer is recommended.

```bash
npm ci
npm run dev
```

The client runs at `http://localhost:5173`; the API defaults to `http://localhost:3001`.

Optional server variables:

```text
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
```

## Quality commands

```bash
npm run typecheck
npm run build
npm test --workspace=@matchfolio/client
npm test --workspace=@matchfolio/shared
```

## Data ownership

CVs are stored in the current browser profile. Clearing site data removes the local library, and there is not yet an account-backed sync service. Do not treat the browser copy as your only long-term backup.

## Status and license

Matchfolio is an active foundation; settings, export, cloud sync, and server-side tailoring are not complete. No license is currently declared.
