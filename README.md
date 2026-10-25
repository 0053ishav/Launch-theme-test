# Launch Theme Test

An isolated Expo Android test app for investigating the gap between Android's native launch splash and a saved in-app theme preference.

## Why this exists

Two separate frames must be evaluated:

1. **Compiled native launch splash:** shown by the operating system before React Native starts.
2. **React/native handoff and app UI:** can reflect a saved app-level preference once the app code is running or a native overlay takes over.

The baseline uses Expo's native splash resources and a persisted app preference. No alternative splash library is installed in this baseline.

## Run

Requirements: Node.js 22.13+, Android SDK/Android Studio, and an Android device or emulator.

```bash
npm install
npm test
npm run typecheck
npx expo prebuild --platform android
npx expo run:android
```

Use a native development or release build. Expo Go cannot validate compiled splash assets or native-module startup behavior.

## Cold-start matrix

Change Android's system appearance from Android Settings, choose the app preference in the test screen, force-stop the app, and then launch it again.

| Saved preference | Android appearance | Expected React-rendered theme |
| --- | --- | --- |
| Light | Dark | Light |
| Dark | Light | Dark |
| System | Dark | Dark |
| System | Light | Light |

For every case, record separately:

- First native splash frame before React Native renders.
- Any flash or color change at native-to-React handoff.
- Final app UI after the screen mounts.

The diagnostics screen reports runtime system theme, saved preference, resolved app theme, and screen mount time. It cannot observe the first native frame; record that visually or using a screen recording.

## Candidate comparison

After capturing the baseline, compare with [`@osuki-dev/react-native-splash`](https://github.com/osuki-dev/react-native-splash) on a separate experiment commit.

The candidate's README states compiled launch assets remain the first OS-rendered frame, while its persisted native overlay can be personalized for subsequent cold starts. Validate the exact behavior on a native build before concluding it supports app-only theme preferences.

## Checks

`npm test`, `npm run typecheck`, and `npm run lint` pass in [GitHub Actions](https://github.com/0053ishav/Launch-theme-test/actions). The CI install generates and commits the npm lockfile when dependencies change. The native cold-start matrix has **not yet been run on a physical Android device or emulator**; that is the next validation step.

## References

- [Expo Splash Screen docs for SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/splash-screen/)
- [Expo splash-screen source](https://github.com/expo/expo/tree/main/packages/expo-splash-screen)
- [Candidate library README](https://github.com/osuki-dev/react-native-splash)
