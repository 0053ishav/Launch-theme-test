# Launch Theme Test

An isolated Expo Android test app investigating the gap between Android's native launch splash and a saved in-app theme preference.

## Why this exists

Two separate frames must be evaluated:

1. **Compiled native launch splash:** rendered by the operating system before React Native starts.
2. **React/native handoff and app UI:** can display an app-level persisted preference once app code runs or an appropriately configured native overlay takes over.

The baseline uses Expo's native splash resources and a locally persisted app preference. No alternative splash library is installed in this baseline.

## Requirements

- Node.js 20+
- Android device or emulator
- Android SDK / Android Studio for local native builds

## Run

```bash
npm install
npm run typecheck
npm test
npx expo prebuild --platform android
npx expo run:android
```

Use a development or release native build. Expo Go cannot validate compiled native splash assets or native-module startup behavior.

## Cold-start matrix

Change Android's system appearance in Android Settings, choose the app preference in the test screen, force-stop the app, then launch it.

| Saved preference | Android appearance | Expected React-rendered theme |
| --- | --- | --- |
| Light | Dark | Light |
| Dark | Light | Dark |
| System | Dark | Dark |
| System | Light | Light |

Record three observations for each case:

- First native splash frame before React Native renders
- Any flash or color change at native-to-React handoff
- Final app UI after the screen mounts

The diagnostic screen reports runtime system theme, saved preference, resolved theme, and mount time. It cannot automatically observe the first native frame; record it visually or with a screen recording.

## Candidate comparison

After capturing the baseline, test the candidate library on a separate experiment commit:

- [`@osuki-dev/react-native-splash`](https://github.com/osuki-dev/react-native-splash)

Its README distinguishes the compiled launch assets from the persisted native overlay: the overlay can be personalized for a subsequent cold start, but the compiled assets remain the OS-rendered first frame. Validate exact behavior in a dev client/release build before concluding that it solves app-only theme preferences.

## References

- [Expo Splash Screen docs for SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/splash-screen/)
- [Expo splash-screen source and README](https://github.com/expo/expo/tree/main/packages/expo-splash-screen)
- [Candidate library README](https://github.com/osuki-dev/react-native-splash)
