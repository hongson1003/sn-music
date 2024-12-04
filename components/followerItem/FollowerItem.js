import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getImage } from "../../utils/stringHandler";

const FollowerItem = ({ follower }) => {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={{ uri: getImage(follower.avatar) }}
        style={styles.avatar}
      />

      {/* Name */}
      <Text
        style={styles.name}
        numberOfLines={1} // Giới hạn chỉ hiển thị 1 dòng
        ellipsizeMode="tail" // Cắt bớt phần thừa nếu dài
      >
        {follower.fullName}
      </Text>

      {/* View Profile Button */}
      <Text style={styles.profileButtonText}>Xem Chi Tiết</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 120,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  name: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
  },
  profileButton: {
    backgroundColor: "#FF5C5C",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  profileButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FollowerItem;
