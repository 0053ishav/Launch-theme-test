import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#142033",
    background: "#F6F8FC",
    backgroundElement: "#FFFFFF",
    backgroundSelected: "#D9E5FF",
    textSecondary: "#586579",
  },
  dark: {
    text: "#F3F6FC",
    background: "#101827",
    backgroundElement: "#182336",
    backgroundSelected: "#2C3D59",
    textSecondary: "#B0BCD0",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui",
    serif: "serif",
    rounded: "system-ui",
    mono: "monospace",
  },
});
