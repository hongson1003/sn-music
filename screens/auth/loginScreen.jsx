import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // Import để điều hướng
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices";
import { axios } from "../../utils";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Sử dụng hook để điều hướng

  useEffect(() => {
    // Sử dụng setOptions để tùy chỉnh hành vi của nút back
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Image
            source={require("./img/back-icon.png")} // Tùy chỉnh icon quay lại nếu cần
            style={{ width: 30, height: 30, marginLeft: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogin = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      await AsyncStorage.setItem("userToken", res.accessToken);
      dispatch(setUser(res));
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ error:", error);
      Alert.alert("Đăng nhập thất bại", "Thông tin đăng nhập không chính xác.");
    } finally {
      setLoading(false); // Dừng loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Image
            source={
              showPassword
                ? require("./img/eye-open.png") // Hình ảnh mở mắt
                : require("./img/eye-closed.png") // Hình ảnh đóng mắt
            }
            style={styles.eyeIconImage}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#4CAF50"
          style={styles.loading}
        />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng Nhập</Text>
        </TouchableOpacity>
      )}

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  eyeIconImage: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 15,
    alignItems: "center", // Canh giữa
  },
  linkText: {
    color: "#007BFF",
    fontSize: 14,
  },
  loading: {
    marginTop: 20,
  },
});

export default LoginScreen;
