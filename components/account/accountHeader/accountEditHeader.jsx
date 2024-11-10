import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { Avatar } from "../avatar";
import Icon from "react-native-vector-icons/FontAwesome"; 
import { useNavigation } from "@react-navigation/native";
const AccountEditHeader = ({ src, followers = "1.2K Followers" }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Avatar src={src} width={86} height={86} />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Lưu Trung Nghĩa</Text>
          <Text style={styles.followersText}>{followers}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },
  nameText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  followersText: {
    color: "gray",
    fontSize: 14,
  },
});

export default AccountEditHeader;
