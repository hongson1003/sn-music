import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { AccountHeader } from "../../components/account/accountHeader";
import { SongList } from "../../components/home/song";

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AccountHeader src="https://cdn.giaoducthoidai.vn/images/87a7b2442062a13f399c8570bdaf2565c6e9fee887635e3df24ab654c546ca1c360523c166d730e899ab5decfecbfeb2e3f8b3502d607816d964998653596079/son-tung-m-tp-1.jpg" />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Liked Songs</Text>
          <SongList
            data={[
              { id: "1" },
              { id: "2" },
              { id: "3" },
              { id: "4" },
              { id: "5" },
            ]}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <SongList
            data={[
              { id: "6" },
              { id: "7" },
              { id: "8" },
              { id: "9" },
              { id: "10" },
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollViewContent: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
