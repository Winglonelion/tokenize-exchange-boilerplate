import * as React from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { selectIsAuth } from "@/states/selectors/auth";

import AuthStack from "./Stacks/Auth/AuthStack";
import Home from "./Stacks/Home";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const isAuth = useSelector(selectIsAuth);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {isAuth ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
