import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "../avatar/index";

const AccountHeader = ({ src, followers = "1.2K Followers" }) => {
  return (
    <View style={styles.container}>
      <Avatar src={src} width={86} height={86} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>Lưu Trung Nghĩa</Text>
        <Text style={styles.followersText}>{followers}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  nameText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  followersText: {
    color: "gray",
    fontSize: 14,
  },
});

export default AccountHeader;
