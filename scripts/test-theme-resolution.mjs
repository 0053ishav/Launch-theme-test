import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = await readFile(
  new URL("../src/theme/theme-preference.ts", import.meta.url),
  "utf8",
);

const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;

const module = { exports: {} };
runInNewContext(transpiled, { module, exports: module.exports });

const { resolveThemePreference } = module.exports;
assert.equal(typeof resolveThemePreference, "function");

const cases = [
  ["light", "dark", "light"],
  ["dark", "light", "dark"],
  ["system", "dark", "dark"],
  ["system", "light", "light"],
];

for (const [preference, systemTheme, expected] of cases) {
  assert.equal(
    resolveThemePreference(preference, systemTheme),
    expected,
    `${preference} preference with system ${systemTheme} should resolve to ${expected}`,
  );
}

console.log(`Passed ${cases.length} theme preference matrix cases.`);
