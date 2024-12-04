import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getImage } from "../../../utils/stringHandler";

const SongHomeItem = ({ song, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: getImage(song.thumbnail) }}
          style={styles.image}
        />
        <Text style={styles.artist}>{song.artist.fullName}</Text>
      </View>

      <Text style={styles.title}>{song.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    overflow: "hidden",
    width: 150,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 120,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  artist: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  title: {
    padding: 10,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SongHomeItem;
