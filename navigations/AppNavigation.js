import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppWrapper from "../persists/AppWrapper";
import AuthenticatedTabs from "./AuthenticatedTabs";
import GuestStack from "./GuestStack";

const AppNavigation = () => {
  const userStore = useSelector((state) => state.user);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (userStore.user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [userStore]);

  return (
    <AppWrapper>
      <NavigationContainer>
        {isLogged ? <AuthenticatedTabs /> : <GuestStack />}
      </NavigationContainer>
    </AppWrapper>
  );
};

export default AppNavigation;
