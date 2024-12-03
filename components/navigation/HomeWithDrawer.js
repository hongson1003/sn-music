import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import HomeScreen from "../../screens/HomeScreen";
import { getImage } from "../../utils";

const HomeWithDrawer = ({ navigation }) => {
  const user = useSelector((state) => state.user?.user);
  const [activeOption, setActiveOption] = React.useState("Tất cả");

  const options = ["Tất cả", "Nhạc", "Podcasts"];

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => navigation.openDrawer()}
      >
        <Image
          source={{
            uri: getImage(user.avatar),
          }}
          style={styles.avatarImage}
        />
      </TouchableOpacity>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <Pressable
            key={option}
            onPress={() => setActiveOption(option)}
            style={[
              styles.optionItem,
              activeOption === option && styles.optionItemActive,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                activeOption === option && styles.optionTextActive,
              ]}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <HomeScreen />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  avatar: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 20,
  },
  optionItem: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: "#1e1e1e",
  },
  optionItemActive: {
    backgroundColor: "#1DB954",
  },
  optionText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  optionTextActive: {
    color: "#121212",
  },
  content: {
    flex: 1,
    marginTop: 10,
    padding: 20,
  },
});

export default HomeWithDrawer;
