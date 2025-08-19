import * as React from "react";
import { requireNativeViewManager } from "expo-modules-core";
import type { RoomPlanViewProps } from "./ExpoRoomplanView.types";

const NativeRoomPlanView: React.ComponentType<RoomPlanViewProps> =
  requireNativeViewManager("ExpoRoomPlanView");

export function RoomPlanView(props: RoomPlanViewProps) {
  return <NativeRoomPlanView {...props} />;
}
