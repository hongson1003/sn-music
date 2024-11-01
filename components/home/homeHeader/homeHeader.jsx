import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Home</Text>
      <View style={styles.viewRight}>
        <Text style={styles.getProText}>Get Pro</Text>

        <Icon name="upload" size={20} color="#fff" />
        <Icon name="envelope-o" size={20} color="#fff" />
        <Icon name="bell-o" size={20} color="#fff" />
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
    fontSize: 24,
    fontWeight: "bold",
  },
  viewRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  getProText: {
    color: "#fff",
    fontSize: 16,
    color: "#FF5500",
    fontWeight: "bold",
  },
});

export default HomeHeader;
