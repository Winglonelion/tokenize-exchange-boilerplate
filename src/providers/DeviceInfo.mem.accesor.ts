/**
 * Accessor object for DeviceInfo
 * store device info in memory
 *
 */
type DeviceInfoAccessorType = {
  _uniqueId: string | undefined;
  _userAgent: string | undefined;
  uniqueId: string | undefined;
  userAgent: string | undefined;
  setUniqueId(value: string): void;
  setUserAgent(value: string): void;
};

export const DeviceInfoAccessor: DeviceInfoAccessorType = {
  _uniqueId: undefined,
  _userAgent: undefined,
  get uniqueId() {
    return this._uniqueId;
  },
  get userAgent() {
    return this._userAgent;
  },
  setUniqueId(value: string) {
    this._uniqueId = value;
  },
  setUserAgent(value: string) {
    this._userAgent = value;
  },
};
