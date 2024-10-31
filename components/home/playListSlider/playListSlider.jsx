import { FlatList, View } from "react-native";
import { PlayList } from "../../utils/playList";
import React from "react";

const PlayListSlider = () => {
  return (
    <View>
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({ item }) => <PlayList />}
        horizontal
      />
    </View>
  );
};

export default PlayListSlider;
