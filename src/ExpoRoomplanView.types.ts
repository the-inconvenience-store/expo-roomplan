import type { ViewProps, StyleProp, ViewStyle } from "react-native";
import type { ScanStatus, ExportType } from "./ExpoRoomplan.types";

export interface RoomPlanViewProps extends ViewProps {
  scanName?: string;
  exportType?: ExportType;
  sendFileLoc?: boolean;
  running?: boolean; // start/stop scanning
  exportTrigger?: number; // bump to trigger an export
  style?: StyleProp<ViewStyle>;
  onStatus?: (e: {
    nativeEvent: { status: ScanStatus; errorMessage?: string };
  }) => void;
  onExported?: (e: {
    nativeEvent: { scanUrl?: string; jsonUrl?: string };
  }) => void;
}
