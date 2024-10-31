import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const PlayList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.playList}>
        <View style={[styles.layer, styles.layerOne]}>
          <View style={styles.layerContent}>
            <View style={styles.layerBody}>
              <Image
                source={{
                  uri: "https://i.scdn.co/image/ab67616d0000b2736408287b53a65219c3e3e173",
                }}
                style={styles.thumbnail}
              />
              <View>
                <Text style={styles.songText}>Sóng gió</Text>
              </View>
            </View>
            <View style={styles.relatedTrack}>
              <Text style={styles.relatedTrackTitle}>Jack - J97</Text>
            </View>
          </View>
        </View>

        <View style={[styles.layer, styles.layerTwo]}>
          <View style={styles.layerContent}>
            <View>
              <Image
                source={{
                  uri: "https://i.scdn.co/image/ab67616d0000b2736408287b53a65219c3e3e173",
                }}
                style={styles.thumbnail}
              />
              <View>
                <Text style={styles.songText}></Text>
              </View>
            </View>
            <View style={styles.relatedTrack} />
          </View>
        </View>

        <View style={[styles.layer, styles.layerThree]}>
          <View style={styles.layerContent}>
            <View>
              <Image
                source={{
                  uri: "https://i.scdn.co/image/ab67616d0000b2736408287b53a65219c3e3e173",
                }}
                style={styles.thumbnail}
              />
              <View>
                <Text style={styles.songText}></Text>
              </View>
            </View>
            <View style={styles.relatedTrack} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    position: "relative",
  },
  playList: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  songText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 5,
  },
  layerContent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  layerBody: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  relatedTrack: {
    paddingLeft: 10,
  },
  relatedTrackTitle: {
    transform: [{ rotate: "90deg" }],
    color: "#fff",
    marginHorizontal: -25,
    overflow: "hidden",
    fontSize: 12,
  },
  layer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 3,
    borderColor: "#000",
    padding: 5,
    backgroundColor: "#736B7A",
    position: "absolute",
    aspectRatio: 1,
  },
  layerOne: {
    zIndex: 3,
    top: 0,
    left: 0,
  },
  layerTwo: {
    zIndex: 2,
    top: 16,
    left: 18,
  },
  layerThree: {
    zIndex: 1,
    top: 28,
    left: 28,
  },
  thumbnail: {
    width: 65,
    height: 65,
  },
});

export default PlayList;
