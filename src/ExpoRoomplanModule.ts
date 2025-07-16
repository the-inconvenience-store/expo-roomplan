import type { ExpoRoomplanModuleType } from './ExpoRoomplan.types';
import { requireNativeModule } from 'expo-modules-core';

const ExpoRoomplan = requireNativeModule<ExpoRoomplanModuleType>('ExpoRoomplan');
export default ExpoRoomplan;