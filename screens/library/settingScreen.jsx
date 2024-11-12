import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices";

export default function SettingScreen() {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("userToken");
    dispatch(clearUser());
  };

  return (
    <View style={styles.container}>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
