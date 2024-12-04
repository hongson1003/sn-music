import React from "react";
import { StyleSheet, View } from "react-native";
import { NewSongList } from "../containers/home";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <NewSongList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  text: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default HomeScreen;
