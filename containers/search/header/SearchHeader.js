import { Text, View, TextInput, StyleSheet } from "react-native";

const SearchHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa tìm kiếm"
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column", // Thay đổi hướng thành cột để title và input nằm dưới nhau
    padding: 10,
    backgroundColor: "#121212",
    gap: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left", // Căn trái cho tiêu đề
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    marginTop: 10, // Khoảng cách giữa tiêu đề và ô input
  },
});

export default SearchHeader;
