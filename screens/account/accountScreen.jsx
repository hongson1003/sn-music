import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AccountHeader } from "../../components/account/accountHeader/index"; 

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <AccountHeader src="https://cdn.giaoducthoidai.vn/images/87a7b2442062a13f399c8570bdaf2565c6e9fee887635e3df24ab654c546ca1c360523c166d730e899ab5decfecbfeb2e3f8b3502d607816d964998653596079/son-tung-m-tp-1.jpg" /> 
      <Text style={styles.screenText}>Account Screen !!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", 
  },
  screenText: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
  },
});
