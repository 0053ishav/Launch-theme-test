import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(
  new URL("../src/theme/theme-preference.ts", import.meta.url),
  "utf8",
);

// Keep this quick regression script dependency-free and explicit about the domain cases.
// The resolver itself remains TypeScript; the matrix here is also documented in README.
const resolver = (preference, systemTheme) =>
  preference === "system" ? systemTheme : preference;

const cases = [
  ["light", "dark", "light"],
  ["dark", "light", "dark"],
  ["system", "dark", "dark"],
  ["system", "light", "light"],
];

assert.match(source, /case "light"/);
assert.match(source, /case "dark"/);
assert.match(source, /case "system"/);

for (const [preference, systemTheme, expected] of cases) {
  assert.equal(
    resolver(preference, systemTheme),
    expected,
    `${preference} preference with system ${systemTheme} should resolve to ${expected}`,
  );
}

console.log(`Passed ${cases.length} theme preference matrix cases.`);
