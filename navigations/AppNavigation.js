import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { GuestScreen, HomeScreen } from "../screens";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const GuestStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Guest" component={GuestScreen} />
    </Stack.Navigator>
  );

  const AuthenticatedTabs = () => (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      {isLoggedIn ? <AuthenticatedTabs /> : <GuestStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
