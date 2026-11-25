// Entry runner for "Worst Fix Ever: Funniest Commit Message".
// Emits a single line that could sit at the top of a real git history —
// a memory leak "fixed" by deleting the part of the app that remembers
// anything, so the cure quietly becomes the outage. That straight-faced
// irony is precisely the joke. Output goes to /output/entry.txt.
import * as fs from "node:fs";
import * as path from "node:path";

const COMMIT_LINE =
  "fix: patch the memory leak by deleting the part of the app that remembers anything";

function prepareOutputDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
  for (const entry of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
  }
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
prepareOutputDir(outputDir);
fs.writeFileSync(path.join(outputDir, "entry.txt"), COMMIT_LINE + "\n", "utf8");
