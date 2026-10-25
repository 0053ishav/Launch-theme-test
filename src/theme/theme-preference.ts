export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

/**
 * Resolve an app-level preference independently from native launch rendering.
 */
export function resolveThemePreference(
  preference: ThemePreference,
  systemTheme: ResolvedTheme,
): ResolvedTheme {
  switch (preference) {
    case "light":
      return "light";
    case "dark":
      return "dark";
    case "system":
      return systemTheme;
  }
}
