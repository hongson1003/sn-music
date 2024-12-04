import { Image, StyleSheet, Text, View } from "react-native";
import { getImage } from "../../utils/stringHandler";

const SongItem = ({ song }) => {
  return (
    <View style={styles.songItem}>
      <Image
        source={{ uri: getImage(song.thumbnail) }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.songInfo}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>
          {song.artist.name || "Unknown Artist"}
        </Text>
        <Text style={styles.duration}>{`${song.duration} seconds`}</Text>
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
  list: {
    marginTop: 10,
  },
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
  emptyText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default SongItem;
