import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import { resolveThemePreference } from "@/theme/theme-preference";
import { useThemeStore } from "@/theme/theme-store";

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const preference = useThemeStore((state) => state.preference);
  const resolvedTheme = resolveThemePreference(
    preference,
    systemColorScheme === "dark" ? "dark" : "light",
  );

  return (
    <>
      <StatusBar style={resolvedTheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: resolvedTheme === "dark" ? "#101827" : "#F6F8FC",
          },
        }}
      />
    </>
  );
}
