import { Image } from "expo-image";
import React, { useState } from "react";
import { Platform, StyleSheet, View, Pressable, Text } from "react-native";
import { RoomPlanView, ExportType } from "expo-roomplan";
import type { ScanStatus } from "expo-roomplan";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [showScanner, setShowScanner] = useState(false);
  const [running, setRunning] = useState(false);
  const [exportTrigger, setExportTrigger] = useState<number | undefined>(
    undefined
  );
  const [scanName] = useState<string>("DemoRoom");
  const exportType: ExportType = ExportType.Parametric;

  const openScanner = () => {
    setShowScanner(true);
    setRunning(true);
  };

  const onCancel = () => {
    setRunning(false);
    setShowScanner(false);
  };

  const onNewRoom = () => {
    // Stop and restart to begin a new capture; the native view accumulates rooms internally
    setRunning(false);
    // brief toggle; in practice, a small delay may help, but usually a state flip is enough
    requestAnimationFrame(() => setRunning(true));
  };

  const onFinish = () => {
    // Stop further scanning and trigger export
    setRunning(false);
    setExportTrigger(Date.now());
  };

  const handleStatus = (e: {
    nativeEvent: { status: ScanStatus; errorMessage?: string };
  }) => {
    const { status, errorMessage } = e.nativeEvent;
    console.log(
      "[RoomPlan Demo] status:",
      status,
      errorMessage ? `- ${errorMessage}` : ""
    );
    // Close the scanner when a terminal status arrives (OK/Error/Canceled)
    if (status === "OK" || status === "Error" || status === "Canceled") {
      setShowScanner(false);
    }
  };

  const handleExported = (e: {
    nativeEvent: { scanUrl?: string; jsonUrl?: string };
  }) => {
    console.log("[RoomPlan Demo] exported:", e.nativeEvent);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      {/* Launch demo button */}
      <View style={styles.stepContainer}>
        <Pressable onPress={openScanner} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Open RoomPlan Scanner</Text>
        </Pressable>
      </View>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">
            npm run reset-project
          </ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      {/* Full-screen overlay with RoomPlanView and custom controls */}
      {showScanner && (
        <View style={styles.overlay}>
          {/* Package component */}
          <RoomPlanView
            style={StyleSheet.absoluteFill}
            scanName={scanName}
            exportType={exportType}
            sendFileLoc={true}
            running={running}
            exportTrigger={exportTrigger}
            onStatus={handleStatus}
            onExported={handleExported}
          />

          <View style={styles.topBar}>
            <Pressable
              onPress={onCancel}
              style={[styles.chip, styles.chipCancel]}
            >
              <Text style={styles.chipText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={onFinish}
              style={[styles.chip, styles.chipFinish]}
            >
              <Text style={styles.chipText}>Finish</Text>
            </Pressable>
          </View>

          <View style={styles.bottomBar}>
            <Pressable onPress={onNewRoom} style={[styles.actionButton]}>
              <Text style={styles.actionButtonText}>Add Another Room</Text>
            </Pressable>
          </View>
        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  topBar: {
    position: "absolute",
    top: 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  chipCancel: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  chipFinish: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  chipText: {
    color: "white",
    fontWeight: "700",
  },
  bottomBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 40,
  },
  actionButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
