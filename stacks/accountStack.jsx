import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/account/accountScreen";
import AccountEditScreen from "../screens/account/accountEditScreen";
import React from "react";

const Stack = createStackNavigator();

function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="AccountEditScreen" component={AccountEditScreen} />
    </Stack.Navigator>
  );
}

export default AccountStack;
