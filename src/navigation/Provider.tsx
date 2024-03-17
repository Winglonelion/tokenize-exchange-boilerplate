import * as React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StateProvider } from "react-redux";

import { store } from "@/states/store";

import AppNavigation from "./Container";

export default function NavigationProvider() {
  return (
    <SafeAreaProvider>
      <StateProvider store={store}>
        <AppNavigation />
      </StateProvider>
    </SafeAreaProvider>
  );
}
