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
  ActivityIndicator, // Thêm loading indicator
} from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices";
import { axios } from "../../utils";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Thêm state cho loading
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    setLoading(true); // Bật loading khi bắt đầu đăng ký
    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      const { accessToken } = response;
      await AsyncStorage.setItem("userToken", accessToken);
      dispatch(setUser(response));
      setLoading(false); // Tắt loading sau khi hoàn tất
    } catch (error) {
      setLoading(false); // Tắt loading nếu có lỗi
      console.error("Error during registration:", error);
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
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Image
            source={
              showPassword
                ? require("./img/eye-open.png")
                : require("./img/eye-closed.png")
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
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
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

      {/* Nút đăng ký */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Hiển thị loading khi đăng ký
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      {/* Liên kết đến trang đăng nhập */}
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
