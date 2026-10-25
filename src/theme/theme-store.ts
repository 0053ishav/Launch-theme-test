import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createMMKV } from "react-native-mmkv";

import type { ThemePreference } from "./theme-preference";

const storage = createMMKV({ id: "launch-theme-test" });

const zustandStorage = {
  getItem: (name: string): string | null => storage.getString(name) ?? null,
  setItem: (name: string, value: string): void => { storage.set(name, value); },
  removeItem: (name: string): void => { storage.remove(name); },
};

type ThemeStore = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      preference: "system",
      setPreference: (preference) => set({ preference }),
    }),
    {
      name: "theme-preference",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ preference: state.preference }),
    },
  ),
);
