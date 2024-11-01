import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import Bg1 from "./img/bg1.jpg";
import Bg2 from "./img/bg2.jpg";
import Bg3 from "./img/bg3.jpg";
import { getRandomColor } from "../../../utils/color";

const randomBg = () => {
  const bg = [Bg1, Bg2, Bg3];
  return bg[Math.floor(Math.random() * bg.length)];
};

const Song = () => {
  return (
    <ImageBackground
      source={randomBg()}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.bgTitle}>
        <Text style={[styles.text, styles.categoryTitle]}>Buzzing</Text>
      </View>
      <Image
        source={{
          uri: "https://live.staticflickr.com/65535/47754632511_3b87728d04_z.jpg",
        }}
        style={styles.thumbnail}
      />
      <View style={styles.bgFooter}>
        <Text style={[styles.text, styles.footer]}>Hip Hop & R&B</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    width: 155,
    height: 155,
    alignItems: "center",
    gap: 5,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
  },
  categoryTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
  },
  bgTitle: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "#000",
  },
  bgFooter: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    // color random
    backgroundColor: getRandomColor(),
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});

export default Song;
