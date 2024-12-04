import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { getImage } from "../../utils/stringHandler";

const SongItem = ({ song, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.songItem}>
      <Image
        source={{ uri: getImage(song.thumbnail) }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.songInfo}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>
          {song.artist.fullName || "Unknown Artist"}
        </Text>
        <Text style={styles.duration}>{`${song.duration} seconds`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    padding: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  songInfo: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  artist: {
    color: "#BBBBBB",
    fontSize: 14,
    marginTop: 4,
  },
  duration: {
    color: "#777777",
    fontSize: 12,
    marginTop: 4,
  },
});

export default SongItem;
