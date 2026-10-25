import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import { resolveThemePreference } from "@/theme/theme-preference";
import { useThemeStore } from "@/theme/theme-store";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const preference = useThemeStore((state) => state.preference);
  const [hydrated, setHydrated] = useState(() => useThemeStore.persist.hasHydrated());
  const resolvedTheme = resolveThemePreference(
    preference,
    systemColorScheme === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    const unsubscribe = useThemeStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useThemeStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (hydrated) {
      void SplashScreen.hideAsync();
    }
  }, [hydrated]);

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
