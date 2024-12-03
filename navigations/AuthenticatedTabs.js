import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import DrawerContent from "../components/navigation/DrawerContent";
import TabsNavigator from "./TabsNavigator";
import APP_ROUTES from "../constants/appRoutes";
import SettingsScreen from "../screens/SettingScreen";

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
  </Drawer.Navigator>
);

export default AuthenticatedTabs;
