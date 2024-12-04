import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import HomeWithDrawer from "../components/navigation/HomeWithDrawer";
import APP_ROUTES from "../constants/appRoutes";
import { LibScreen, PlaylistDetailScreen, SearchScreen } from "../screens";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Lib") {
            iconName = "library";
          } else {
            iconName = "help-circle";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#888888",
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopWidth: 0,
          paddingVertical: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          paddingBottom: 5,
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
      <Tab.Screen
        name={APP_ROUTES.SEARCH}
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Khám phá",
        }}
      />
      <Tab.Screen
        name={APP_ROUTES.LIB}
        component={LibScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={APP_ROUTES.DETAIL_PLAYLIST}
        component={PlaylistDetailScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
