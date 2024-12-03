import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import APP_KEYS from "../constants/appKeys";
import { updateUser } from "../redux/features/userSlice";
import userService from "../services/userService";
import { getImage } from "../utils/stringHandler";

const UpdateProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();

  const [newFullName, setNewFullName] = useState(user?.fullName || "");

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem(APP_KEYS.ACCESS_TOKEN);
      const res = await userService.updateUser(token, newFullName);
      if (res) {
        dispatch(updateUser({ ...user, fullName: newFullName }));
        Toast.show({
          type: "success",
          text1: "Cập nhật thành công",
          text2: "Hồ sơ của bạn đã được cập nhật",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Cập nhật thất bại",
          text2: "Vui lòng thử lại sau",
        });
      }
    } catch (error) {
      console.log("🚀 ~ handleUpdate ~ error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>

      {/* Avatar */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: getImage(user?.avatar) }} style={styles.avatar} />
      </View>

      {/* Input tên người dùng */}
      <TextInput
        value={newFullName}
        onChangeText={setNewFullName}
        style={styles.input}
        placeholder="Nhập tên mới"
        placeholderTextColor="#aaa"
      />

      {/* Nút lưu thay đổi */}
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
      </TouchableOpacity>

      <Toast />
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
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default UpdateProfileScreen;
