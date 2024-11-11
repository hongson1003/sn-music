import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AuthScreen({ navigation }) {
  const handleLogin = async () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("./img/auth-bg.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonText}>Go to Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: "auto",
    marginTop: 50,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    width: "80%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ff6347", // màu nền nút Login
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "#4CAF50", // màu nền nút Register
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
