import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text>Library Screennnn</Text>
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
