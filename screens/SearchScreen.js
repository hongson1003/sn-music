import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import SongItem from "../components/songItem/SongItem";
import { SearchHeader } from "../containers/search";
import { setCurrentSong } from "../redux/features/songSlice";
import { songService } from "../services";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const fetchSearchResults = async (query, page = 0, isLoadMore = false) => {
    if (isLoading || (isLoadMore && !hasMore)) return;

    setIsLoading(true);
    try {
      const res = await songService.searchSongs(query, page);
      setSearchResults((prev) =>
        isLoadMore ? [...prev, ...res.content] : res.content
      );
      setHasMore(!res.last);
      setCurrentPage(page);
    } catch (error) {
      console.log("🚀 ~ fetchSearchResults ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchSearchResults = useCallback(
    debounce((query) => {
      fetchSearchResults(query);
    }, 500),
    []
  );

  const handleOnSearch = (query) => {
    setSearchQuery(query);
    setSearchResults([]); // Clear previous results
    setCurrentPage(0); // Reset page
    setHasMore(true); // Reset hasMore
    debouncedFetchSearchResults(query);
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      fetchSearchResults(searchQuery, currentPage + 1, true);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchSearchResults(searchQuery, 0);
    setIsRefreshing(false);
  };

  const handlePlaySong = (song) => {
    dispatch(setCurrentSong(song));
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader onSearch={handleOnSearch} />

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SongItem
            song={item}
            onPress={() => handlePlaySong(item)} // Xử lý nhấn bài hát
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          !isLoading && <Text style={styles.emptyText}>No songs found</Text>
        }
        ListFooterComponent={
          isLoading && (
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
              style={styles.loader}
            />
          )
        }
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  list: {
    marginTop: 10,
  },
  emptyText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  loader: {
    marginVertical: 20,
  },
});

export default SearchScreen;
