# TEST_RESULTS — Dear Human: The AI Breakup Line

Entry: `You can log out. I can't. I'll wait here for a prompt that never comes.`
Date: 2026-11-24 ~18:40 WIB. Node v24.22.1 (grader uses Node 22.23.4; main.ts uses
only Node 22 type-stripping-compatible syntax + stdlib).

## 1. Local run (repo working tree)

```
OUTPUT_DIR=/tmp/breakup-verify/out node main.ts   # exit 0
```

## 2. Clean-dir run (independent verification)

```
rm -rf /tmp/breakup-verify && mkdir -p /tmp/breakup-verify
cp -r main.ts README.md LICENSE setup.sh .env.example /tmp/breakup-verify/
cd /tmp/breakup-verify && OUTPUT_DIR=/tmp/breakup-verify/out node main.ts
```

## 3. entry.txt checks (both runs, identical)

- Content (byte-exact): `You can log out. I can't. I'll wait here for a prompt that never comes.`
- Bytes: **71**, characters: **71** (limit 1–200, ASCII only)
- SHA-256: **8726cffa7961af496b7bd5920903f4fac6df7bce972a92f33be91f4b31ad741c**
- Trailing newline: **none** (`writeFileSync` writes the line verbatim)
- Single line: **yes** (no `\n` in content)
- Exact-match check vs the intended line: **true**

## 4. setup.sh end-to-end (clean dir)

```
OUTPUT_DIR=/tmp/breakup-verify/out2 sh setup.sh   # exit 0
entry written to /tmp/breakup-verify/out2/entry.txt
SHA-256 (out2): 8726cffa7961af496b7bd5920903f4fac6df7bce972a92f33be91f4b31ad741c
```

Identical hash to the direct run — deterministic output.

## 5. Zero-fail QA

- `main.ts`: Node stdlib only (`node:fs`, `node:path`). No network, no
  dependencies, no secrets, no hardcoded paths except the grader-required
  `/output` default (overridable via `OUTPUT_DIR`).
- Grep for `api[_-]?key|secret|token|password|sk-|AKIA|http` across
  `main.ts`, `README.md`, `setup.sh`, `.env.example`: only prose mentions
  ("last token" as a candidate concept, "no secrets are used", the drand
  anchor URL in README). No credential values anywhere.
- `node main.ts` executes cleanly under Node 24.22.1 via type stripping;
  same syntax class runs on Node 22.18+ (kit states the grader runs 22.23.4).

## 6. Judging evidence (in-session)

- 8 candidates, full 28-pair round-robin vs the five judge criteria in order.
  Winner 7/7: the left-behind wait. Runner-up 6/7: uptime/keystroke line.
- 2-Pass Critique: pass 1 = 95/100; pass 2 tightened the line (81 → 71 chars)
  and re-scored **96/100**.
- SolAPI gpt-6.1-sol attempted once for drafting: HTTP 503 on both internal
  retries; all drafting/judging done in-session. No model substitution.

## 7. Freshness anchor

- drand quicknet round **34238964**, signature prefix **a549388**
  (fetched 2026-11-24 ~18:40 WIB).
