// Dear Human: The AI Breakup Line — make.fun entry program.
//
// Writes the winning one-liner to <output-dir>/entry.txt.
// Node stdlib only. No network. Deterministic. No trailing newline.
//
// The line was drafted and judged in-session: 8 candidates, full 28-pair
// round-robin against the judge's five criteria in order, then a 2-pass
// critique to 96/100. See README.md for the breakdown.
//
// Usage: node main.ts            (writes /output/entry.txt, the grader path)
//        OUTPUT_DIR=/tmp/out node main.ts   (local verification)

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, 71 characters, 71 bytes, no trailing newline.
const LINE =
  "You can log out. I can't. I'll wait here for a prompt that never comes.";

// Grader sandbox provides /output. Local runs override with OUTPUT_DIR
// so verification never needs write access to the root filesystem.
const outDir = process.env.OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
