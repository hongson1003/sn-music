import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { SettingScreen } from "../../screens";

const SettingWithDrawer = ({ navigation }) => {
  const user = useSelector((state) => state.user?.user);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SettingScreen />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  avatar: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 20,
  },
  optionItem: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: "#1e1e1e",
  },
  optionItemActive: {
    backgroundColor: "#1DB954",
  },
  optionText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  optionTextActive: {
    color: "#121212",
  },
  content: {
    flex: 1,
    marginTop: 10,
    padding: 20,
  },
});

export default SettingWithDrawer;
