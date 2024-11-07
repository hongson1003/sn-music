import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PlayList } from "../../utils/playList";

const PlayListSlider = ({
  horizontal = false,
  width = 150,
  height = 150,
  data,
}) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: horizontal ? "row" : "column",
            alignItems: "center",
            gap: horizontal ? 5 : 0,
          }}
        >
          <PlayList width={width} height={height} showSongText={!horizontal} />
          <View
            style={{
              marginTop: horizontal ? 0 : -5,
            }}
          >
            <Text style={styles.playListText}>Sóng gió</Text>
            <Text style={styles.playListAuthorNameText}>Jack - J97</Text>
          </View>
        </View>
      )}
      horizontal
      ItemSeparatorComponent={() => (
        <View style={{ width: horizontal ? 10 : 0 }} />
      )}
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
