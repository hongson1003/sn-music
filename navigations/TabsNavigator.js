import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import HomeWithDrawer from "../components/navigation/HomeWithDrawer";
import APP_ROUTES from "../constants/appRoutes";
import { SearchScreen } from "../screens";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home"; // Đổi biểu tượng cho trang Home
        } else if (route.name === "Search") {
          iconName = "search"; // Đổi biểu tượng cho trang Search
        } else {
          iconName = "help-circle"; // Biểu tượng mặc định
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#ffffff",
      tabBarInactiveTintColor: "#888888",
      tabBarStyle: {
        backgroundColor: "#121212",
        borderTopWidth: 0,
        paddingVertical: 10, // Thêm padding dọc cho tab
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "600",
        paddingBottom: 5, // Thêm padding dưới nhãn
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
      }}
    />
  </Tab.Navigator>
);

export default TabsNavigator;
