import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import AppWrapper from "../persists/AppWrapper";
import AuthenticatedTabs from "./AuthenticatedTabs";
import GuestStack from "./GuestStack";

const AppNavigation = () => {
  const userStore = useSelector((state) => state.user);

  return (
    <AppWrapper>
      <NavigationContainer>
        {userStore?.user ? <AuthenticatedTabs /> : <GuestStack />}
      </NavigationContainer>
    </AppWrapper>
  );
};

export default AppNavigation;
