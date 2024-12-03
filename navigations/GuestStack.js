import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import APP_ROUTES from "../constants/appRoutes";
import { GuestScreen, RegisterScreen } from "../screens";
const Stack = createNativeStackNavigator();

const GuestStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={APP_ROUTES.GUEST}
      component={GuestScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name={APP_ROUTES.REGISTER} component={RegisterScreen} />
  </Stack.Navigator>
);

export default GuestStack;
