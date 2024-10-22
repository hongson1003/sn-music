import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home/homeScreen";
import ProfileScreen from "../screens/home/profileScreen";
import React from "react";

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
