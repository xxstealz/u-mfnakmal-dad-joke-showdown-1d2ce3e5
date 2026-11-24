import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I told the printer it was out of line, so it started a new line.";
const MAX_CHARS = 200;

function validateJoke(joke: string): number {
  const chars = Array.from(joke);
  if (chars.length === 0) {
    throw new Error("joke is empty");
  }
  if (chars.length > MAX_CHARS) {
    throw new Error(
      `joke is ${chars.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (joke.trim().length === 0) {
    throw new Error("joke is only whitespace");
  }
  if (joke.includes("\n") || joke.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  // A dad joke told aloud lands its punchline at the end, so the line
  // must close with sentence-ending punctuation.
  if (!/[.!?]$/.test(joke)) {
    throw new Error("joke must end with sentence-ending punctuation");
  }
  return chars.length;
}

const charCount = validateJoke(JOKE);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
console.error(`dad joke OK: ${charCount} characters`);
