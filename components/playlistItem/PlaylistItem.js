import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getImage } from "../../utils/stringHandler";

const PlaylistItem = ({ playlist, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(playlist)}
    >
      {/* Thumbnail */}
      <Image
        source={{ uri: getImage(playlist.thumbnail) }}
        style={styles.thumbnail}
      />

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {playlist.title}
        </Text>
        <Text style={styles.subTitle}>{playlist.songs.length} bài hát</Text>
      </View>

      {/* Icon */}
      <FontAwesome name="chevron-right" size={20} color="#fff" />
    </TouchableOpacity>
  );
};

export default PlaylistItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  subTitle: {
    color: "#A0A0A0",
    fontSize: 14,
  },
});
