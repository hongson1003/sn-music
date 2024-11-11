import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { axios } from "../../utils";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State để điều khiển hiển thị mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State cho xác nhận mật khẩu

  const handleRegister = async () => {
    // Kiểm tra mật khẩu có khớp hay không
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      // Gọi API đăng ký người dùng
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log("🚀 ~ handleRegister ~ response:", response);

      if (response.status === 201) {
        console.log("🚀 ~ handleRegister ~ response.data:", response.data);
        const { accessToken, expiresIn, user } = response.data;
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("user", JSON.stringify(user));

        Alert.alert("Success", "Account created successfully!");

        // Chuyển hướng tới màn hình đăng nhập
        navigation.navigate("Home");
      } else {
        console.log("🚀 ~ handleRegister ~ response.data:", response.data);
        Alert.alert("Error", "Failed to create account");
      }
    } catch (error) {
      console.error("Error during registration:", error); // Log lỗi chi tiết

      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Mật khẩu */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword} // Kiểm tra trạng thái show password
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)} // Toggle để hiển thị/ẩn mật khẩu
          style={styles.eyeIcon}
        >
          <Image
            source={
              showPassword
                ? require("./img/eye-open.png") // Hình ảnh mắt mở
                : require("./img/eye-closed.png") // Hình ảnh mắt đóng
            }
            style={styles.eyeIconImage}
          />
        </TouchableOpacity>
      </View>

      {/* Xác nhận mật khẩu */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword} // Kiểm tra trạng thái show confirm password
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle để hiển thị/ẩn xác nhận mật khẩu
          style={styles.eyeIcon}
        >
          <Image
            source={
              showConfirmPassword
                ? require("./img/eye-open.png")
                : require("./img/eye-closed.png")
            }
            style={styles.eyeIconImage}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  eyeIconImage: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#007BFF",
    marginTop: 15,
    textAlign: "center",
  },
});
