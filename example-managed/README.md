# example-managed

## Tutorial: Use expo-roomplan in a managed Expo app (iOS)

This tutorial walks you through using the expo-roomplan library in a managed Expo project.

> RoomPlan is iOS‑only and requires iOS 17+ and a LiDAR‑capable device (e.g., iPhone 12 Pro or newer, iPad Pro). You must run a development build or EAS build — Expo Go cannot load native modules.

---

## What you’ll build

- Add expo-roomplan to a managed Expo app
- Configure iOS privacy manifests via `app.json`
- Prebuild and run a dev client on iOS
- Start a RoomPlan capture from a screen

---

## Prerequisites

- macOS with Xcode 15+
- Node and npm (or yarn)
- Expo CLI (npx is fine)
- A device or simulator on iOS 17+
- For real scanning, use a physical LiDAR device

---

## 1) Install the library and plugin

In your own app, install from npm and enable the plugin. (This example links the local package.)

```sh
npx expo install expo-roomplan
```

Add the plugin in `app.json` so Expo prebuild can configure native iOS settings automatically:

```jsonc
{
  "expo": {
    // ...
    "plugins": ["expo-roomplan"],
  },
}
```

Optional: ensure your iOS deployment target is 17.0 using the `expo-build-properties` plugin:

```jsonc
{
  "expo": {
    // ...
    "plugins": [
      ["expo-build-properties", { "ios": { "deploymentTarget": "17.0" } }],
    ],
  },
}
```

---

## 2) Configure iOS privacy manifests (App Store required)

Expo supports defining a privacy manifest directly in `app.json`. This example inlines the same content you’d otherwise place in a `PrivacyInfo.xcprivacy` file.

In `example-managed/app.json` (or your app’s `app.json`), add under `ios.privacyManifests`:

```jsonc
{
  "expo": {
    // ...
    "ios": {
      // ...
      "privacyManifests": {
        "NSPrivacyAccessedAPITypes": [
          {
            "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryUserDefaults",
            "NSPrivacyAccessedAPITypeReasons": ["CA92.1"],
          },
          {
            "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryFileTimestamp",
            "NSPrivacyAccessedAPITypeReasons": ["0A2A.1", "3B52.1", "C617.1"],
          },
          {
            "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryDiskSpace",
            "NSPrivacyAccessedAPITypeReasons": ["E174.1", "85F4.1"],
          },
          {
            "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategorySystemBootTime",
            "NSPrivacyAccessedAPITypeReasons": ["35F9.1"],
          },
        ],
        "NSPrivacyCollectedDataTypes": [],
        "NSPrivacyTracking": false,
      },
    },
  },
}
```

This embeds the Apple privacy manifest via app config — no separate file needed.

---

## 3) What the config plugin does (`app.plugin.js`)

Enabling the `expo-roomplan` plugin in `app.json` does the following during prebuild:

- Ensures `NSCameraUsageDescription` is present in the iOS Info.plist (adds a sensible default if missing)
- Ensures your Podfile sets `platform :ios, '17.0'` when safe to do so (won’t duplicate existing dynamic lines)
- It does not inject a privacy manifest — use `ios.privacyManifests` in `app.json` as above

No manual edits to native files are required beyond prebuild.

---

## 4) Prebuild and run on iOS

Generate native projects and install CocoaPods:

```sh
npx expo prebuild -p ios
(cd ios && pod install)
```

Build and run a development client (required for native modules):

```sh
npx expo run:ios
```

Tips:

- If you previously ran a dev client before installing the module, uninstall the app from the simulator/device and rebuild.
- Use an iOS 17+ simulator (e.g., iPhone 15/16) or a 17+ physical device. RoomPlan requires iOS 17+.
- Real scanning requires a LiDAR device.

---

## 5) Use the RoomPlan hook in your app

Minimal example in a React component:

```tsx
import { Button, View } from "react-native";
import { useRoomPlan, ExportType } from "expo-roomplan";

export default function ScanScreen() {
  const { startRoomPlan } = useRoomPlan({
    exportType: ExportType.Parametric,
    sendFileLoc: false,
  });

  return (
    <View style={{ padding: 16 }}>
      <Button title="Start RoomPlan" onPress={() => startRoomPlan("My Scan")} />
    </View>
  );
}
```

- On iOS, this presents the native RoomPlan capture UI full-screen.
- On Android, the hook throws (RoomPlan is iOS-only).

---

## Troubleshooting

- “Cannot find native module 'ExpoRoomPlan'”
  - Rebuild the dev client after installing the library (`npx expo run:ios`).
  - Ensure you’re on iOS 17+.
- “Invalid hook call”
  - Usually indicates multiple React copies. In monorepos, configure Metro to dedupe `react` and `react-native`.
  - Clear cache: `npx expo start --clear`.
- “Multiple commands produce PrivacyInfo.xcprivacy”
  - Ensure you’re not copying a `.xcprivacy` file via CocoaPods or manual Xcode resources when also using `ios.privacyManifests`.
- Build fails with iOS < 17
  - Set iOS deployment target to 17.0 (see step 1) and rebuild.

---

## Recap

- Install `expo-roomplan` and enable the `expo-roomplan` plugin.
- Define `ios.privacyManifests` in `app.json`.
- Prebuild and run a dev client on iOS 17+.
- Use `useRoomPlan` to start captures in your components.

Happy scanning!
