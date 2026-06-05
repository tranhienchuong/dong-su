# Agent Instructions for Dòng Sử

## Source of truth

Before making any code changes, always read:

- `spec.md`
- The files directly related to the requested task

For Phase 12 / Thiên Mệnh Engine, `spec.md` is the primary source of truth.

If `spec.md` conflicts with existing code, do not guess. Report the conflict first and propose the smallest safe adjustment.

## Implementation rules

- Do not add features outside the requested phase.
- Do not redesign UI unless the requested phase explicitly asks for UI changes.
- Do not move logic into the wrong layer.
- Do not put engine logic into `src/data/dong-su/episodes.ts`.
- Keep core game deterministic.
- AI may only be used for interpretation/narrative layers.
- AI must not decide stats, memory flags, persona, ending, nextSceneId, or choice effects.
- Do not send raw prompts from the client to API routes.
- Do not create separate localStorage keys for core progress unless the spec explicitly says so.

## Architecture rules

Use the current architecture:

- Shared types: `src/types/dong-su.ts`
- Game logic / deterministic engine: `src/lib/dong-su/game.ts`
- Progress / localStorage parsing: `src/lib/dong-su/progress.ts`
- Episode progress hook implementation: `src/hooks/dong-su/useEpisodeProgress.ts`
- Public hook re-export: `src/hooks/useEpisodeProgress.ts`
- Story data: `src/data/dong-su/zhu-yuanzhang-episode-1.ts`
- Episode index/card metadata: `src/data/dong-su/episodes.ts`
- Components: `src/components/dong-su/`

## Workflow

For every requested phase:

1. Read the relevant section in `spec.md`.
2. Summarize the exact tasks from that section.
3. Inspect the current code before editing.
4. Produce a short implementation plan.
5. Implement only that phase.
6. Run:

```bash
npm run build
npm run lint
```

## Report

After implementation, provide:

- Files created
- Files modified
- Whether the implementation followed `spec.md`
- Build/lint result
- Any deviation from spec and why

## Stop conditions

Stop and ask before coding if:

- The requested work is not described in `spec.md`
- The spec and current code disagree
- The change requires adding dependencies
- The change requires changing core game behavior outside the requested phase
- The change may break save/restore, audio, archive, or existing story flow
