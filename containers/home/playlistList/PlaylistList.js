import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PlaylistItem } from "../../../components/playlistItem";
import APP_ROUTES from "../../../constants/appRoutes";
import { playlistService } from "../../../services";
import { useNavigation } from "@react-navigation/native";

const PlaylistList = () => {
  const navigation = useNavigation();
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlaylists = async () => {
    try {
      const res = await playlistService.getPlaylist();
      setPlaylists(res);
    } catch (error) {
      setError("Không thể tải playlist.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const handleOnPress = (playlist) => {
    navigation.navigate(APP_ROUTES.DETAIL_PLAYLIST, { playlist: playlist });
  };

  return (
    <FlatList
      data={playlists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PlaylistItem playlist={item} onPress={() => handleOnPress(item)} />
      )}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      ListEmptyComponent={
        <Text style={styles.emptyText}>Không có playlist</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 16,
    textAlign: "center",
  },
  emptyText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default PlaylistList;
