import * as React from "react";

import * as SplashScreen from "expo-splash-screen";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StateProvider } from "react-redux";

import { ApplicationProvider } from "@ui-kitten/components";

import { DeviceInfoProvider } from "@/prodiver/DeviceInfoProvider";
import FontProvider from "@/prodiver/FontProvider";
import { queryClient } from "@/services/query";
import { persistor, store } from "@/states/store";

import * as eva from "@eva-design/eva";
import { QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";

import AppNavigation from "./Container";

/**
 * prevent the splash screen from auto hiding
 * will be hidden after the app is fully loaded and ready to be displayed
 * be place in DeviceInfoProvider
 */
SplashScreen.preventAutoHideAsync();

export default function NavigationProvider() {
  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <StateProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <FontProvider>
                <DeviceInfoProvider>
                  <AppNavigation />
                </DeviceInfoProvider>
              </FontProvider>
            </PersistGate>
          </StateProvider>
        </QueryClientProvider>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}
