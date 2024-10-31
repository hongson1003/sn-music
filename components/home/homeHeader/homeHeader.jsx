import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Home</Text>
      <View style={styles.viewRight}>
        <Icon name="upload" size={25} color="#fff" />
        <Icon name="envelope-o" size={25} color="#fff" />
        <Icon name="bell-o" size={25} color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  viewRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
});

export default HomeHeader;
