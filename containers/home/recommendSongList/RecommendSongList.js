import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import APP_KEYS from "../../../constants/appKeys";
import { setCurrentSong } from "../../../redux/features/songSlice";
import { interactionService, songService } from "../../../services";
import { SongHomeItem } from "../songHomeItem";

const RecommendSongList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchRecommendSongList();
    }
  }, [isFocused]);

  const fetchRecommendSongList = async () => {
    const token = await AsyncStorage.getItem(APP_KEYS.ACCESS_TOKEN);

    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await songService.getRecommendSongs(token);
      setData(res);
    } catch (error) {
      console.log("🚀 ~ fetchRecommendSongList ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendSongList();
  }, []);

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

  const handleOnPress = (song) => {
    fetchUpdateInteraction(song.id, song.duration);
    dispatch(setCurrentSong(song));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <SongHomeItem song={item} onPress={() => handleOnPress(item)} />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bài Hát Gợi Ý</Text>
        <Text style={styles.emptyText}>Không có bài hát gợi ý nào</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài Hát Gợi Ý ({data.length} bài hát)</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có bài hát mới nào</Text>
        }
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  list: {
    padding: 10,
  },
  item: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    marginRight: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default RecommendSongList;
