import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const FollowerItem = ({ follower, onFollowPress }) => {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image source={{ uri: follower.avatar }} style={styles.avatar} />

      {/* Name */}
      <Text style={styles.name}>{follower.fullName}</Text>

      {/* Follow Button */}
      <TouchableOpacity
        style={styles.followButton}
        onPress={() => onFollowPress(follower.id)}
      >
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
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
  followButton: {
    backgroundColor: "#FF5C5C",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  followButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default FollowerItem;
