import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "../../account/avatar";
import { TouchableOpacity } from "react-native";

const FollowItem = () => {
  return (
    <View style={styles.container}>
      <Avatar
        src={
          "https://cdn.giaoducthoidai.vn/images/87a7b2442062a13f399c8570bdaf2565c6e9fee887635e3df24ab654c546ca1c360523c166d730e899ab5decfecbfeb2e3f8b3502d607816d964998653596079/son-tung-m-tp-1.jpg"
        }
      />
      <Text style={styles.text}>SoundCloud</Text>
      <TouchableOpacity style={styles.touch}>
        <Text style={styles.touchText}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  text: {
    color: "#fff",
  },
  touch: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  touchText: {
    color: "#333",
    fontWeight: "bold",
  },
});

export default FollowItem;
