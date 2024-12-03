import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { getImage } from "../../utils";
import APP_ROUTES from "../../constants/appRoutes";

const DrawerContent = ({ navigation }) => {
  const user = useSelector((state) => state.user?.user);

  const menuItems = [
    {
      name: "Thêm tài khoản",
      icon: "person-add-outline",
      screen: "AddAccountScreen",
    },
    {
      name: "Bản phát hành mới",
      icon: "newspaper-outline",
      screen: "ReleaseNotesScreen",
    },
    { name: "Gần đây", icon: "time-outline", screen: "RecentScreen" },
    { name: "Cài đặt", icon: "settings-outline", screen: "SettingsScreen" },
    {
      name: "Quyền riêng tư",
      icon: "lock-closed-outline",
      screen: APP_ROUTES.SETTING,
    },
  ];

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: getImage(user?.avatar) }}
          style={styles.avatarImage}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{user?.fullName}</Text>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileText}>Xem hồ sơ</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuItems}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)} // Điều hướng đến màn hình tương ứng
          >
            <Icon name={item.icon} size={24} color="#fff" />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userDetails: {
    flexDirection: "column",
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileButton: {
    marginTop: 5,
  },
  profileText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuText: {
    color: "#fff",
    marginLeft: 15,
    fontSize: 16,
  },
});

export default DrawerContent;
