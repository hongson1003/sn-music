import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import HomeWithDrawer from "../components/navigation/HomeWithDrawer";
import SettingWithDrawer from "../components/navigation/SettingWithDrawer";
import APP_ROUTES from "../constants/appRoutes";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName =
          route.name === "Home" ? "home-outline" : "help-circle-outline";
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#888",
      tabBarStyle: {
        backgroundColor: "#121212",
        borderTopWidth: 0,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "600",
      },
    })}
  >
    <Tab.Screen
      name={APP_ROUTES.HOME}
      component={HomeWithDrawer}
      options={{
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

export default TabsNavigator;
