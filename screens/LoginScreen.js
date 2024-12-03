import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import APP_KEYS from "../constants/appKeys";
import { login } from "../redux/features/userSlice";
import { authService } from "../services";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // Kiểm tra các trường bắt buộc
    if (!email.trim() || !password.trim()) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Lỗi!",
        text2: "Vui lòng điền đầy đủ thông tin!",
        visibilityTime: 3000,
      });
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Lỗi!",
        text2: "Email không hợp lệ!",
        visibilityTime: 3000,
      });
      return;
    }

    // Gửi yêu cầu đăng nhập
    try {
      const res = await authService.login(email, password); // authService phải có phương thức login
      dispatch(login(res.user)); // Cập nhật thông tin người dùng vào Redux store
      await AsyncStorage.setItem(APP_KEYS.ACCESS_TOKEN, res.accessToken); // Lưu token vào AsyncStorage

      Toast.show({
        type: "success",
        position: "top",
        text1: "Đăng nhập thành công!",
        visibilityTime: 3000,
      });
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ error:", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Lỗi!",
        text2: "Đăng nhập không thành công. Vui lòng thử lại!",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Đăng nhập</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.goToRegisterText}>
            Chưa có tài khoản? Đăng ký ngay
          </Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  content: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 25,
    color: "#fff",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  goToRegisterText: {
    color: "#fff",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
