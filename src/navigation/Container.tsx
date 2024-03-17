import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { selectIsAuth } from "@/states/selectors/auth";

import AuthStack from "./Stacks/Auth/AuthStack";
import MainTab from "./Tabs/Main";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const isAuth = useSelector(selectIsAuth);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {isAuth ? (
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
