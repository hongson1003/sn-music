import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PlayList } from "../../utils/playList";

const PlayListSlider = ({ horizontal = false, width = 150, height = 150 }) => {
  return (
    <FlatList
      data={[1, 2, 3, 4]}
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: horizontal ? "row" : "column",
            alignItems: "center",
            gap: horizontal ? 10 : 0,
          }}
        >
          <PlayList width={width} height={height} />
          <View>
            <Text style={styles.playListText}>Sóng gió</Text>
            <Text style={styles.playListAuthorNameText}>Jack - J97</Text>
          </View>
        </View>
      )}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
  playListText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  playListAuthorNameText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default PlayListSlider;
