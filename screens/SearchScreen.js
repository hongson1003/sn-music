import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Hoặc bất kỳ thư viện icon nào bạn sử dụng
import { useDispatch } from "react-redux";
import SongItem from "../components/songItem/SongItem";
import { SearchHeader } from "../containers/search";
import { setCurrentSong } from "../redux/features/songSlice";
import { songService } from "../services";

// Hàm debounce để giảm tần suất gọi API
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState(" ");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  // Hàm gọi API tìm kiếm
  const fetchSearchResults = async (query, page = 0, isLoadMore = false) => {
    if (isLoading || (isLoadMore && !hasMore)) return;

    setIsLoading(true);
    try {
      const res = await songService.searchSongs(query, page);

      // Thêm kết quả mới vào danh sách hiện tại
      setSearchResults((prev) =>
        isLoadMore ? [...prev, ...res.content] : res.content
      );

      // Cập nhật trạng thái phân trang
      setHasMore(!res.last);
      setCurrentPage(res.pageable.pageNumber);
    } catch (error) {
      console.error("🚀 ~ fetchSearchResults ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm debounce gọi API
  const debouncedFetchSearchResults = useCallback(
    debounce((query) => {
      fetchSearchResults(query);
    }, 500),
    []
  );

  // Xử lý tìm kiếm
  const handleOnSearch = (query) => {
    setSearchQuery(query);
    setSearchResults([]);
    setCurrentPage(0);
    setHasMore(true);
    debouncedFetchSearchResults(query);
  };

  // Tải thêm dữ liệu khi cuộn
  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      fetchSearchResults(searchQuery, currentPage + 1, true);
    }
  };

  // Làm mới danh sách
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchSearchResults(searchQuery, 0);
    setIsRefreshing(false);
  };

  // Xử lý phát nhạc
  const handlePlaySong = (song) => {
    dispatch(setCurrentSong(song));
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader onSearch={handleOnSearch} />

      {searchResults.length === 0 ? (
        <View style={styles.placeholder}>
          <Icon name="search" size={80} color="#FFFFFF" />
          <Text style={styles.placeholderText}>
            Nhập tên bài hát để tìm kiếm
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SongItem song={item} onPress={() => handlePlaySong(item)} />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            !isLoading && (
              <Text style={styles.emptyText}>Không tìm thấy bài hát nào</Text>
            )
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
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
    paddingBottom: 70,
  },
  list: {
    marginTop: 10,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#FFFFFF",
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
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
