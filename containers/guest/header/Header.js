import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { height } = Dimensions.get("window");

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={require("./imgs/logo_guest.png")} style={styles.image} />
      <Text style={styles.title}>Hàng triệu bài hát miễn phí trên Spotify</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.5,
    padding: 20,
  },
  image: {
    width: height * 0.1,
    height: height * 0.1,
    marginBottom: 10,
  },
  title: {
    fontSize: 29,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default Header;
