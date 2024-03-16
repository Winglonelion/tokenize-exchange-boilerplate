import DeviceInfo from "react-native-device-info";

export function getUniqueId() {
  return DeviceInfo.getUniqueId();
}

export function getBundleId() {
  return DeviceInfo.getBundleId();
}
