import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LibHeader } from "../components/library";
import { LibraryScreen, SettingScreen } from "../screens/library";

const Stack = createStackNavigator();

function LibStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{
          headerTitle: () => <LibHeader />,
          headerStyle: {
            backgroundColor: "#000",
          },
        }}
      />

      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

export default LibStack;
