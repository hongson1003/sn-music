import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import APP_KEYS from "../constants/appKeys";
import { stopSong } from "../redux/features/songSlice";
import { logout } from "../redux/features/userSlice";

const settingItems = [
  { name: "Tài khoản", icon: "person-outline" },
  { name: "Nội dung và chế độ hiển thị", icon: "color-palette-outline" },
  { name: "Phát lại", icon: "play-circle-outline" },
  { name: "Quyền riêng tư và mạng xã hội", icon: "lock-closed-outline" },
  { name: "Thông báo", icon: "notifications-outline" },
  { name: "Ứng dụng và thiết bị", icon: "phone-portrait-outline" },
  { name: "Tiết kiệm dữ liệu và ngoại tuyến", icon: "wifi-off-outline" },
  { name: "Chất lượng nội dung nghe nhìn", icon: "headset-outline" },
  { name: "Giới thiệu", icon: "information-circle-outline" },
];

const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem(APP_KEYS.ACCESS_TOKEN);
    dispatch(logout());
    dispatch(stopSong());
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Cài đặt</Text>
      </View>

      {/* Settings items */}
      <FlatList
        data={settingItems}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem}>
            <Icon name={item.icon} size={24} color="#fff" />
            <Text style={styles.menuItemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.menuList}
      />

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Nền tối
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25, // Tăng khoảng cách dưới header
    paddingHorizontal: 10, // Thêm padding vào hai bên
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18, // Giảm kích thước chữ một chút
    fontWeight: "600",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginVertical: 8,
    paddingHorizontal: 10, // Thêm padding vào các mục
  },
  menuItemText: {
    color: "#fff",
    marginLeft: 15,
    fontSize: 14, // Chữ nhỏ hơn, vừa vặn
  },
  menuList: {
    paddingBottom: 100, // Thêm khoảng cách dưới cho danh sách mục
  },
  logoutButton: {
    paddingVertical: 15,
    backgroundColor: "#FF3B30",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 10, // Thêm khoảng cách hai bên
    marginBottom: 20, // Cách dưới một chút
  },
  logoutText: {
    color: "#fff",
    fontSize: 16, // Giảm kích thước chữ đăng xuất
    fontWeight: "600",
  },
});

export default SettingScreen;
