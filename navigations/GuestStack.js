import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import APP_ROUTES from "../constants/appRoutes";
import { GuestScreen, LoginScreen, RegisterScreen } from "../screens";
const Stack = createNativeStackNavigator();

const GuestStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={APP_ROUTES.GUEST} component={GuestScreen} />
    <Stack.Screen name={APP_ROUTES.REGISTER} component={RegisterScreen} />
    <Stack.Screen name={APP_ROUTES.LOGIN} component={LoginScreen} />
  </Stack.Navigator>
);

export default GuestStack;
