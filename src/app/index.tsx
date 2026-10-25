import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  resolveThemePreference,
  type ResolvedTheme,
  type ThemePreference,
} from "@/theme/theme-preference";
import { useThemeStore } from "@/theme/theme-store";

const OPTIONS: ThemePreference[] = ["light", "dark", "system"];

const COLORS = {
  light: {
    background: "#F6F8FC",
    surface: "#FFFFFF",
    text: "#142033",
    muted: "#586579",
    border: "#D9E1EC",
    accent: "#2457D6",
    accentText: "#FFFFFF",
  },
  dark: {
    background: "#101827",
    surface: "#182336",
    text: "#F3F6FC",
    muted: "#B0BCD0",
    border: "#34445D",
    accent: "#90B4FF",
    accentText: "#10203F",
  },
} as const;

export default function HomeScreen() {
  const systemColorScheme = useColorScheme();
  const systemTheme: ResolvedTheme = systemColorScheme === "dark" ? "dark" : "light";
  const preference = useThemeStore((state) => state.preference);
  const setPreference = useThemeStore((state) => state.setPreference);
  const resolvedTheme = resolveThemePreference(preference, systemTheme);
  const colors = COLORS[resolvedTheme];
  const [startedAt, setStartedAt] = useState<string>("Not captured");

  useEffect(() => {
    setStartedAt(new Date().toLocaleTimeString());
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.eyebrow, { color: colors.accent }]}>NATIVE LAUNCH SPIKE</Text>
        <Text style={[styles.title, { color: colors.text }]}>Launch Theme Test</Text>
        <Text style={[styles.description, { color: colors.muted }]}>
          Does a saved in-app theme preference survive the cold-start splash when Android uses the opposite appearance?
        </Text>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>1. App theme preference</Text>
          <View style={styles.options}>
            {OPTIONS.map((option) => {
              const selected = preference === option;
              return (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  key={option}
                  onPress={() => setPreference(option)}
                  style={[
                    styles.option,
                    {
                      backgroundColor: selected ? colors.accent : colors.surface,
                      borderColor: selected ? colors.accent : colors.border,
                    },
                  ]}>
                  <Text style={{ color: selected ? colors.accentText : colors.text, fontWeight: "700" }}>
                    {option === "system" ? "System" : option === "light" ? "Light" : "Dark"}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={[styles.note, { color: colors.muted }]}>
            Preference is persisted locally. Force-stop and relaunch to test a cold start.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>2. Runtime diagnostics</Text>
          <DiagnosticRow label="Android system theme" value={systemTheme} colors={colors} />
          <DiagnosticRow label="Saved preference" value={preference} colors={colors} />
          <DiagnosticRow label="Expected app theme" value={resolvedTheme} colors={colors} />
          <DiagnosticRow label="Screen mounted at" value={startedAt} colors={colors} />
          <Text style={[styles.note, { color: colors.muted }]}>
            This screen shows the React-rendered theme. Record the native splash separately; it appears before this screen mounts.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>3. Cold-start checklist</Text>
          {[
            "Change Android system appearance in Settings.",
            "Return here and choose the app preference.",
            "Force-stop the app, then launch it again.",
            "Record the very first native splash frame.",
            "Record any flash between splash and this screen.",
            "Confirm the final UI matches Expected app theme.",
          ].map((item, index) => (
            <Text key={item} style={[styles.checklistItem, { color: colors.text }]}>
              <Text style={{ color: colors.accent, fontWeight: "800" }}>{index + 1}. </Text>
              {item}
            </Text>
          ))}
        </View>

        <Text style={[styles.footer, { color: colors.muted }]}>
          Baseline first: this app intentionally starts with Expo's native splash. We will compare it with the candidate library in a separate step.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

type Palette = (typeof COLORS)[ResolvedTheme];

function DiagnosticRow({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: Palette;
}) {
  return (
    <View style={[styles.diagnosticRow, { borderBottomColor: colors.border }]}>
      <Text style={[styles.diagnosticLabel, { color: colors.muted }]}>{label}</Text>
      <Text style={[styles.diagnosticValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { padding: 20, gap: 16, paddingBottom: 36 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, fontWeight: "800", marginTop: 8 },
  title: { fontSize: 32, fontWeight: "800", letterSpacing: -0.8 },
  description: { fontSize: 15, lineHeight: 23, marginBottom: 4 },
  card: { borderWidth: 1, borderRadius: 20, padding: 18, gap: 14 },
  sectionTitle: { fontSize: 17, fontWeight: "800" },
  options: { flexDirection: "row", gap: 8 },
  option: {
    flex: 1,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 6,
  },
  note: { fontSize: 13, lineHeight: 20 },
  diagnosticRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    gap: 12,
  },
  diagnosticLabel: { fontSize: 13, flexShrink: 1 },
  diagnosticValue: { fontSize: 14, fontWeight: "700", textAlign: "right", flexShrink: 1 },
  checklistItem: { fontSize: 14, lineHeight: 21 },
  footer: { fontSize: 12, lineHeight: 18, paddingHorizontal: 4 },
});
