import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PlayList } from "../../components/utils/playList";
import PlayListSlider from "../../components/home/playListSlider/playListSlider";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.moreLike}>
        <Text style={styles.titleText}>More of what you like</Text>
        <View style={styles.playListMore}>
          <PlayListSlider />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  moreLike: {
    flex: 1,
  },
  bodyText: {
    color: "#fff",
    fontSize: 16,
  },
  titleText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  playListMore: {
    marginVertical: 10,
  },
});
