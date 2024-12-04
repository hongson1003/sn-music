import { useCallback, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import SongItem from "../components/songItem/SongItem";
import { SearchHeader } from "../containers/search";
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
  console.log("🚀 ~ SearchScreen ~ searchResults:", searchResults);

  const fetchSearchResults = async (query) => {
    try {
      const res = await songService.searchSongs(query);
      setSearchResults(res);
    } catch (error) {
      console.log("🚀 ~ fetchSearchResults ~ error:", error);
    }
  };

  const debouncedFetchSearchResults = useCallback(
    debounce((query) => {
      fetchSearchResults(query);
    }, 500), // 500ms delay
    []
  );

  const handleOnSearch = (query) => {
    console.log("🚀 ~ handleOnSearch ~ query:", query);
    setSearchQuery(query);
    debouncedFetchSearchResults(query);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader onSearch={handleOnSearch} />

      <FlatList
        data={searchResults.content}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SongItem song={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No songs found</Text>
        }
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
});

export default SearchScreen;
