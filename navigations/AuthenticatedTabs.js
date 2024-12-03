import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import DrawerContent from "../components/navigation/DrawerContent";
import APP_ROUTES from "../constants/appRoutes";
import { ProfileScreen, UpdateProfileScreen } from "../screens";
import SettingsScreen from "../screens/SettingScreen";
import TabsNavigator from "./TabsNavigator";

const Drawer = createDrawerNavigator();

const AuthenticatedTabs = () => (
  <Drawer.Navigator
    drawerContent={(props) => <DrawerContent {...props} />}
    screenOptions={{
      drawerType: "slide",
      drawerStyle: {
        width: "80%",
        backgroundColor: "#1DB954",
      },
      headerShown: false,
    }}
  >
    <Drawer.Screen name="Tabs" component={TabsNavigator} />
    <Drawer.Screen name={APP_ROUTES.SETTING} component={SettingsScreen} />
    <Drawer.Screen name={APP_ROUTES.PROFILE} component={ProfileScreen} />
    <Drawer.Screen
      name={APP_ROUTES.UPDATE_PROFILE}
      component={UpdateProfileScreen}
    />
  </Drawer.Navigator>
);

export default AuthenticatedTabs;
