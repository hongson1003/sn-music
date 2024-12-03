import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { RegisterContainer } from "../containers/guest/register";

const RegisterScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <RegisterContainer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default RegisterScreen;
