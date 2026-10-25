export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

/**
 * Resolves the app's explicit preference independently of the OS splash screen.
 * Keep this pure so the preference matrix can be tested without React Native.
 */
export function resolveThemePreference(
  preference: ThemePreference,
  systemTheme: ResolvedTheme,
): ResolvedTheme {
  return preference === "system" ? systemTheme : preference;
}
