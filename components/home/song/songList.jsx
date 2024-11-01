import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Song from "./song";

const SongList = ({ data = [] }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Song />
          <View>
            <Text style={styles.text}>Song Title</Text>
            <Text style={styles.text}>Artist Name</Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
      horizontal
      ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    gap: 5,
  },
  text: {
    color: "#fff",
  },
});

export default SongList;
