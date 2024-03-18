import DeviceInfo from "react-native-device-info";

export function getUniqueId() {
  return DeviceInfo.getUniqueId();
}

export function getBundleId() {
  return DeviceInfo.getBundleId();
}

export function getUserAgent() {
  return DeviceInfo.getUserAgent();
}

/**
 *
 * TODO: tested get user agent sync didn't work
 * prefer to mark as known issue from
 * https://github.com/react-native-device-info/react-native-device-info#readme
 */
export function getUserAgentSync() {
  return DeviceInfo.getUserAgentSync();
}

export function syncUniqueId() {
  return DeviceInfo.syncUniqueId();
}
