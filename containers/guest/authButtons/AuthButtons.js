import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import APP_ROUTES from "../../../constants/appRoutes";

const AuthButtons = () => {
  const navigate = useNavigation();

  const handleOnPressRegister = () => {
    navigate.navigate(APP_ROUTES.REGISTER);
  };

  const handleOnPressLogin = () => {
    navigate.navigate(APP_ROUTES.LOGIN);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleOnPressRegister}
      >
        <Text style={styles.buttonText}>Đăng ký miễn phí</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.buttonText}>Tiếp tục bằng Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleOnPressLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  signUpButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: "center",
  },
  googleButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AuthButtons;
