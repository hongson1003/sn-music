import React from "react";
import { Image } from "react-native";

const Avatar = ({ src, width = 86, height = 86 }) => {
  return (
    <Image
      source={{
        uri: src,
      }}
      style={{
        width: width,
        height: height,
        borderRadius: width / 2,
      }}
    />
  );
};

export default Avatar;
