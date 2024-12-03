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
import { authService } from "../../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APP_KEYS from "../../../constants/appKeys";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/features/userSlice";

const RegisterContainer = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleRegister = async () => {
    // Reset lỗi trước khi kiểm tra
    setError("");

    // Kiểm tra các trường bắt buộc
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Lỗi!",
        topOffset: 50,
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
        topOffset: 50,
        text2: "Email không hợp lệ!",
        visibilityTime: 3000,
      });
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Lỗi!",
        topOffset: 50,
        text2: "Mật khẩu phải có ít nhất 6 ký tự!",
        visibilityTime: 3000,
      });
      return;
    }

    // Kiểm tra khớp mật khẩu
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Lỗi!",
        topOffset: 50,
        text2: "Mật khẩu và xác nhận mật khẩu không khớp!",
        visibilityTime: 3000,
      });
      return;
    }

    // Gửi yêu cầu đăng ký
    try {
      const res = await authService.register(fullName, email, password);
      await AsyncStorage.setItem(APP_KEYS.ACCESS_TOKEN, res.accessToken);
      dispatch(login(res.user));

      Toast.show({
        type: "success",
        position: "top",
        text1: "Thành công!",
        topOffset: 50,
        text2: "Đăng ký thành công.",
        visibilityTime: 3000,
      });
    } catch (error) {
      console.log("🚀 ~ handleRegister ~ error:", error);

      Toast.show({
        type: "error",
        position: "top",
        text1: "Lỗi!",
        topOffset: 50,
        text2: "Có lỗi xảy ra. Vui lòng thử lại sau!",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng ký</Text>

        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#aaa"
        />

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

        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Quay lại đăng nhập</Text>
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
  formContainer: {
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
  registerButton: {
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
  errorText: {
    color: "#FF6F61",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  goBackText: {
    color: "#fff",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default RegisterContainer;
