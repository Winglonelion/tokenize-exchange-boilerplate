import React, { createContext, useContext, useEffect, useState } from "react";

import * as SplashScreen from "expo-splash-screen";

import {
  getUniqueId,
  getUserAgent,
  syncUniqueId,
} from "@/services/device-info";

import { DeviceInfoAccessor } from "./DeviceInfo.mem.accesor";

interface DeviceInfo {
  userAgent: string;
  uniqueId: string;
}

interface DeviceInfoContextValue {
  deviceInfo: DeviceInfo | null;
}

const DeviceInfoContext = createContext<DeviceInfoContextValue>({
  deviceInfo: null,
});

export const useDeviceInfo = () => useContext(DeviceInfoContext);

interface DeviceInfoProviderProps {
  children: React.ReactNode;
}

export const DeviceInfoProvider: React.FC<DeviceInfoProviderProps> = ({
  children,
}) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        await syncUniqueId();
        const [userAgent, uniqueId] = await Promise.all([
          getUserAgent(),
          getUniqueId(),
        ]);
        DeviceInfoAccessor.setUserAgent(userAgent);
        DeviceInfoAccessor.setUniqueId(uniqueId);
        SplashScreen.hideAsync();

        setDeviceInfo({ userAgent, uniqueId });
      } catch (error) {
        console.error("Failed to fetch device info:", error);
      }
    };

    fetchDeviceInfo();
  }, []);

  if (!deviceInfo) return null;

  return (
    <DeviceInfoContext.Provider value={{ deviceInfo }}>
      {children}
    </DeviceInfoContext.Provider>
  );
};
