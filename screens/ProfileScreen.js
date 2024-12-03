import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import APP_ROUTES from "../constants/appRoutes";
import { getImage } from "../utils/stringHandler";

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user?.user);

  const handleOnClickEdit = () => {
    navigation.navigate(APP_ROUTES.UPDATE_PROFILE);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={styles.profileBackground}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: getImage(user?.avatar) }}
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            {/* Tên người dùng với số dòng giới hạn */}
            <Text
              style={styles.userName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {user?.fullName}
            </Text>
            <Text style={styles.followInfo}>
              {user?.followers} người theo dõi | {user?.following} đang theo dõi
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleOnClickEdit}>
        <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  profileBackground: {
    backgroundColor: "#2c2c2c",
    padding: 20,
    borderRadius: 10,
    marginTop: 60, // Điều chỉnh khoảng cách cho phù hợp với nút quay lại
    marginBottom: 30,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userDetails: {
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    maxWidth: "70%", // Giới hạn chiều rộng để tránh tràn
  },
  followInfo: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 5,
  },
  editButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;
