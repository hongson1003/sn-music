import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import {
  LikedSongList,
  NewSongList,
  RecommendSongList,
} from "../containers/home";
import { PlaylistList } from "../containers/home/playlistList";
import { TopFollowerList } from "../containers/home/topFollowerList";

const HomeScreen = () => {
  const { currentSong } = useSelector((state) => state.song);

  // Danh sách các component cần hiển thị
  const sections = [
    { key: "NewSongList", component: <NewSongList /> },
    { key: "RecommendSongList", component: <RecommendSongList /> },
    { key: "LikedSongList", component: <LikedSongList /> },
    { key: "TopFollowerList", component: <TopFollowerList /> },
    { key: "PlaylistList", component: <PlaylistList /> },
  ];

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 20 }}>{item.component}</View>
      )}
      contentContainerStyle={[
        styles.container,
        {
          marginBottom: currentSong ? 120 : 0,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
  },
});

export default HomeScreen;
