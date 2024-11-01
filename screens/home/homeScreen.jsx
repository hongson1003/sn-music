import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import FollowList from "../../components/home/follow/followList";
import { PlayListSlider } from "../../components/home/playListSlider";
import { SongList } from "../../components/home/song";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* playlist 1 */}
        <View style={styles.playList}>
          <Text style={styles.titleText}>More of what you like</Text>
          <View style={styles.playListMore}>
            <PlayListSlider width={160} height={160} data={[1, 2, 3, 4, 5]} />
          </View>
        </View>
        {/* playlist 2 */}
        <View style={styles.playList}>
          <Text style={styles.titleText}>Recently Played</Text>
          <View style={styles.playListMore}>
            <PlayListSlider
              horizontal
              width={80}
              height={80}
              data={[1, 2, 3, 4, 5]}
            />
          </View>
          <View style={styles.playListMore}>
            <PlayListSlider
              horizontal
              width={80}
              height={80}
              data={[1, 2, 3, 4, 5]}
            />
          </View>
        </View>
        {/* playlist 3 */}
        <View style={styles.playList}>
          <Text style={styles.titleText}>Mixed for Hồng Sơn Nguyễn</Text>
          <View style={styles.playListMore}>
            <PlayListSlider width={120} height={120} data={[1, 2, 3, 4, 5]} />
          </View>
        </View>

        {/* playlist 4 */}
        <View style={styles.playList}>
          <Text style={styles.titleText}>Introducing Buzzing</Text>
          <View style={styles.playListMore}>
            <SongList data={[1, 2, 3, 4, 5, 6]} />
          </View>
        </View>

        {/* playlist 5 */}
        <View style={styles.playList}>
          <Text style={styles.titleText}>
            Made for Hồng Sơn Nguyễn and more
          </Text>
          <View style={styles.playListMore}>
            <SongList data={[1, 2, 3, 4, 5, 6]} />
          </View>
        </View>

        {/* playlist 6 */}
        <View style={styles.playList}>
          <Text style={styles.titleText}>Artists you should follow</Text>
          <View style={styles.playListMore}>
            <FollowList data={[1, 2, 3, 4, 5, 6]} />
          </View>
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  playList: {
    marginVertical: 5,
  },
  titleText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  playListMore: {
    marginVertical: 5,
  },
});
