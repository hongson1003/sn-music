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
import { setCurrentSong } from "../../../redux/features/songSlice";
import { songService } from "../../../services";
import { SongHomeItem } from "../songHomeItem";

const NewSongList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchNewSongs = async () => {
    try {
      const res = await songService.getNewsSongs();
      setData(res);
    } catch (error) {
      console.log("🚀 ~ fetchNewSongs ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewSongs();
  }, []);

  const handleOnPress = (song) => {
    console.log("🚀 ~ handleOnPress ~ song:", song);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài Hát Mới</Text>
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

export default NewSongList;
