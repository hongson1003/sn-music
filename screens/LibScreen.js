import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import APP_KEYS from "../constants/appKeys";
import { SongHomeItem } from "../containers/home";
import { songService, userService } from "../services"; // Đảm bảo bạn import các service cần thiết

const LibScreen = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading

  // Lấy bài hát đã thích
  const fetchLikedSongs = async () => {
    const token = await AsyncStorage.getItem(APP_KEYS.ACCESS_TOKEN);

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await songService.getLikedSongs(token); // Giả sử có một hàm để lấy bài hát yêu thích
      setLikedSongs(res); // Lưu dữ liệu vào state
    } catch (error) {
      console.log("🚀 ~ fetchLikedSongs ~ error:", error);
    } finally {
      setIsLoading(false); // Đặt lại trạng thái loading sau khi có dữ liệu
    }
  };

  // Lấy người theo dõi
  const fetchFollowers = async () => {
    const token = await AsyncStorage.getItem(APP_KEYS.ACCESS_TOKEN);

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await userService.getFollowers(token); // Giả sử có một hàm để lấy người theo dõi
      setFollowers(res); // Lưu dữ liệu người theo dõi vào state
    } catch (error) {
      console.log("🚀 ~ fetchFollowers ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedSongs();
    fetchFollowers(); // Gọi fetchFollowers để lấy dữ liệu người theo dõi
  }, []);

  // Hiển thị bài hát yêu thích
  const renderLikedSong = ({ item }) => <SongHomeItem song={item} />;

  // Hiển thị người theo dõi
  const renderFollower = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
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
      <FlatList
        data={likedSongs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLikedSong}
        style={styles.list}
      />
      <Text style={styles.title}>Người đã theo dõi</Text>
      <FlatList
        data={followers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFollower}
        style={styles.list}
      />
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
  item: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
});

export default LibScreen;
