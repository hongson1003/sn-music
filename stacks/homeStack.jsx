import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HomeHeader } from "../components/home/homeHeader";
import HomeScreen from "../screens/home/homeScreen";
import ProfileScreen from "../screens/home/profileScreen";

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: () => <HomeHeader />,
          headerStyle: {
            backgroundColor: "#000",
            color: "#fff",
          },
        }}
      />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
