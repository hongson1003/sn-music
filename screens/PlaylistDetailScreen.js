import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import SongItem from "../components/songItem/SongItem";
import APP_KEYS from "../constants/appKeys";
import { setCurrentSong } from "../redux/features/songSlice";
import { interactionService } from "../services";

const PlaylistDetailScreen = ({ route, navigation }) => {
  const { playlist } = route.params;
  const dispatch = useDispatch();

  const fetchUpdateInteraction = async (songId, duration) => {
    const token = await AsyncStorage.getItem(APP_KEYS.ACCESS_TOKEN);

    if (!token) {
      return;
    }
    try {
      await interactionService.saveInteraction(songId, duration, token);
    } catch (error) {
      console.log("🚀 ~ fetchUpdateInteraction ~ error:", error);
    }
  };

  const handleSongPress = (song) => {
    fetchUpdateInteraction(song.id, song.duration);
    dispatch(setCurrentSong(song));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon
            name="arrow-back"
            size={30}
            color="#fff"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Playlist Details</Text>
      </View>
      <FlatList
        data={playlist?.songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SongItem song={item} onPress={() => handleSongPress(item)} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: "row", // Đặt header và back button nằm cùng một hàng
    alignItems: "center", // Căn giữa theo chiều dọc
    marginBottom: 15, // Khoảng cách dưới tiêu đề
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    marginLeft: 0,
  },
  header: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    flex: 1, // Tiêu đề sẽ chiếm hết không gian còn lại
    textAlign: "center", // Căn giữa tiêu đề
  },
  listContainer: {
    paddingBottom: 20,
    marginTop: 20,
  },
  emptyText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default PlaylistDetailScreen;
