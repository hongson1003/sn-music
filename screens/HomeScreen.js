import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import {
  LikedSongList,
  NewSongList,
  RecommendSongList,
} from "../containers/home";
import { TopFollowerList } from "../containers/home/topFollowerList";

const HomeScreen = () => {
  const { currentSong } = useSelector((state) => state.song);

  return (
    <ScrollView
      style={[
        styles.container,
        {
          marginBottom: currentSong ? 60 : 0,
        },
      ]}
    >
      <NewSongList />
      <RecommendSongList />
      <LikedSongList />
      <TopFollowerList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});

export default HomeScreen;
