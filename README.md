# expo-roomplan

React Native implementation of Apple's RoomPlan SDK.

Read more about it here: [Apple - RoomPlan](https://developer.apple.com/augmented-reality/roomplan/)

# Usage

The best way to use this package is with the `useRoomPlan` hook:

```
const { startRoomPlan } = useRoomPlan();

async function startScan() {
  try {
    await startRoomPlan("My Scan");
  } catch (error) {
    console.error("Error: ", error);
  }
}
```

`startRoomPlan` is an async function that starts a new instance of a UIViewController with the RoomCaptureViewDelegate and RoomCaptureSessionDelegate protocols from RoomPlan. It provides instructions throughout the scan. Once it's finished, you can either add another room to the structure or export what you have. You are then redirected back to the previous screen you were on.

It accepts one parameter, a string for the name of the exported USDZ and JSON from RoomPlan. You can also add other options by providing a config object to the hook:

```
const { startRoomPlan } = useRoomPlan({ exportType: ExportType.Mesh, sendFileLoc: true });
```

By default, it exports to parametric generates an ActivityViewController to share via AirDrop or email or other methods.

There are three export types:
- parametric
- mesh
- model

You can read more about them here: [Apple - RoomPlan USD Export Options](https://developer.apple.com/documentation/roomplan/capturedroom/usdexportoptions)

`sendFileLoc` is an option that lets you opt out of the ActivityViewController flow and receive the URLs of the exported files manually.

There's also a const called `roomScanStatus` that the hook returns:

```
const { roomScanStatus } = useRoomPlan();
```

It watches the internal status of the scan. It has 4 different states:
- Not Started
- Canceled
- Error
- OK


# Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install expo-roomplan
```

Add this to your `expo-module.config.json`:

```
{
  "platforms": ["android", "ios"],
  "android": {
    "moduleName": "ExpoRoomPlan"
  }
}
```

### Configure for Android

Only compatible with iOS 17.0 or higher.

### Configure for iOS

Only compatible with iOS 17.0 or higher.

Run `npx pod-install` after installing the npm package.

Replace `YOUR_TEAM_ID` with a real development team.

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
