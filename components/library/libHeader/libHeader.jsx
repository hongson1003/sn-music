import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const LibHeader = () => {
  const navigation = useNavigation(); // Sử dụng useNavigation để lấy navigation

  const handleOnPressSetting = () => {
    navigation.navigate("SettingScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Library</Text>
      <View style={styles.viewRight}>
        <Icon name="search" size={20} color="#fff" />
        <Icon name="heart" size={20} color="#fff" />
        <Icon
          name="cog"
          size={20}
          color="#fff"
          onPress={handleOnPressSetting}
        />
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
});

export default LibHeader;
