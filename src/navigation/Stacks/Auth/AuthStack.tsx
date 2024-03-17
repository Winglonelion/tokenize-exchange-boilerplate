// In App.js in a new project

import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "@/features/Auth/LogIn.screen";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
