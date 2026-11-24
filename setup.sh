#!/bin/sh
# One-shot setup: check Node >= 22, run the entry program, print the result.
set -e
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "error: node is required (Node 22+)" >&2
  exit 1
fi

NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]")
if [ "$NODE_MAJOR" -lt 22 ]; then
  echo "error: Node 22+ required, found $(node --version)" >&2
  exit 1
fi

OUT_DIR="${OUTPUT_DIR:-/output}"
OUTPUT_DIR="$OUT_DIR" node main.ts

echo "entry written to $OUT_DIR/entry.txt:"
cat "$OUT_DIR/entry.txt"
echo
