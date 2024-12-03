import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SearchHeader } from "../containers/search";
import { songService } from "../services";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchSearchResults(query);
  };

  const fetchSearchResults = async (searchQuery) => {
    try {
      const res = await songService.searchSongs(searchQuery);
      console.log("🚀 ~ fetchSearchResults ~ res:", res);
      setSearchResults(res);
    } catch (error) {
      console.log("🚀 ~ fetchSearchResults ~ error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader />
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
