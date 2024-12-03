import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { AuthButtons } from "../containers/guest/authButtons";
import { Header } from "../containers/guest/header";

const GuestScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <AuthButtons />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});

export default GuestScreen;
