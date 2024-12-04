import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import icon thư viện
import APP_KEYS from "../constants/appKeys";
import { SongHomeItem } from "../containers/home";
import { songService } from "../services";

const LibScreen = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocus = useIsFocused();

  const fetchLikedSongs = async () => {
    const token = await AsyncStorage.getItem(APP_KEYS.ACCESS_TOKEN);

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await songService.getLikedSongs(token);
      setLikedSongs(res);
    } catch (error) {
      console.log("🚀 ~ fetchLikedSongs ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedSongs();
  }, [isFocus]);

  const renderLikedSong = ({ item }) => (
    <View style={styles.gridItem}>
      <SongHomeItem song={item} />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài nhạc đã thích</Text>
      {likedSongs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="musical-notes-outline" size={100} color="#FFFFFF" />
          <Text style={styles.emptyText}>Bạn chưa thích bài nhạc nào.</Text>
        </View>
      ) : (
        <FlatList
          data={likedSongs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLikedSong}
          numColumns={2}
          columnWrapperStyle={styles.row}
          style={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  list: {
    marginBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  gridItem: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default LibScreen;
