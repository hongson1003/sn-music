import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MainTabNavigator from "../mainTabNavigator";
import { setUser } from "../redux/slices";
import { AuthStack } from "../stacks";
import { axios } from "../utils";

const AppConfigWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const userStore = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        fetchUser(token);
      } else {
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    return () => {};
  }, []);

  const fetchUser = async (token) => {
    try {
      const res = await axios.get("/auth/me");
      if (res) {
        dispatch(setUser(res));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("🚀 ~ fetchUser ~ error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("userStore", userStore);
    if (!isLoading) {
      if (!userStore.user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    }
  }, [userStore, isLoading]);

  if (isLoading) {
    // Hiển thị màn hình loading nếu đang kiểm tra
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Checking login status...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppConfigWrapper;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
