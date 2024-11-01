import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PlayListSlider } from "../../components/home/playListSlider";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* playlist 1 */}
      <View style={styles.playList}>
        <Text style={styles.titleText}>More of what you like</Text>
        <View style={styles.playListMore}>
          <PlayListSlider />
        </View>
      </View>
      {/* playlist 2 */}
      <View>
        <Text style={styles.titleText}>Recently Played</Text>
        <View style={styles.playListMore}>
          <PlayListSlider horizontal width={92} height={92} />
        </View>
        <View style={styles.playListMore}>
          <PlayListSlider horizontal width={92} height={92} />
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
  playList: {
    marginVertical: 5,
  },
  bodyText: {
    color: "#fff",
    fontSize: 16,
  },
  titleText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  playListMore: {
    marginVertical: 5,
  },
});
