import { resolveThemePreference, type ThemePreference, type ResolvedTheme } from "./theme-preference";

describe("resolveThemePreference", () => {
  const cases: Array<{
    preference: ThemePreference;
    systemTheme: ResolvedTheme;
    expected: ResolvedTheme;
  }> = [
    { preference: "light", systemTheme: "dark", expected: "light" },
    { preference: "dark", systemTheme: "light", expected: "dark" },
    { preference: "system", systemTheme: "dark", expected: "dark" },
    { preference: "system", systemTheme: "light", expected: "light" },
  ];

  it.each(cases)(
    "$preference preference with system $systemTheme resolves to $expected",
    ({ preference, systemTheme, expected }) => {
      expect(resolveThemePreference(preference, systemTheme)).toBe(expected);
    },
  );
});
