import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "../screens/feed/feedScreen";
import React from "react";

const Stack = createStackNavigator();

function FeedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FeedScreen" component={FeedScreen} />
    </Stack.Navigator>
  );
}

export default FeedStack;
