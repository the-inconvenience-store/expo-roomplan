import ExpoModulesCore
import UIKit
import RoomPlan

@available(iOS 17.0, *)
public class ExpoRoomPlanViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoRoomPlanView")

    // Register a React Native view that embeds RoomCaptureView
    View(RoomPlanCaptureUIView.self) {
      Events("onStatus", "onExported")

      // Props to control flow
      Prop("scanName") { (view, value: String?) in
        view.scanName = value
      }
      Prop("exportType") { (view, value: String?) in
        view.exportType = value
      }
      Prop("sendFileLoc") { (view, value: Bool?) in
        view.sendFileLoc = value ?? false
      }
      Prop("running") { (view, value: Bool?) in
        view.setRunning(value ?? false)
      }
      // Bump this number to trigger an export on demand
      Prop("exportTrigger") { (view, value: Double?) in
        view.handleExportTrigger(value)
      }
    }
  }
}
