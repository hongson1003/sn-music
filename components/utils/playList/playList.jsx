import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const PlayList = ({ width = 150, height = 150, showSongText = true }) => {
  const layerOffset = Math.min(width, height) * 0.09;
  const thumbnailSize = Math.min(width, height) * 0.4;

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.playList}>
        <View style={[styles.layer, styles.layerOne]}>
          <View style={styles.layerContent}>
            <View style={styles.layerBody}>
              <Image
                source={{
                  uri: "https://cdn.tuoitre.vn/zoom/480_300/2019/6/19/jack-1560931851558668237008-crop-1560932012161893602955.jpg",
                }}
                style={[
                  styles.thumbnail,
                  { width: thumbnailSize, height: thumbnailSize },
                ]}
              />
              <View style={styles.bgSong}>
                <Text
                  style={[
                    styles.songText,
                    {
                      fontSize: 8,
                    },
                  ]}
                >
                  Sóng gió
                </Text>
              </View>
            </View>
            {showSongText && (
              <View style={styles.relatedTrack}>
                <Text style={styles.relatedTrackTitle}>Jack - J97</Text>
              </View>
            )}
          </View>
        </View>

        <View
          style={[
            styles.layer,
            styles.layerTwo,
            { top: layerOffset, left: layerOffset },
          ]}
        >
          <View style={styles.layerContent}>
            <View>
              <Image
                source={null}
                style={[
                  styles.thumbnail,
                  { width: thumbnailSize, height: thumbnailSize },
                ]}
              />
              <Text style={styles.songText}></Text>
            </View>
            <View style={styles.relatedTrack} />
          </View>
        </View>

        <View
          style={[
            styles.layer,
            styles.layerThree,
            { top: layerOffset * 1.8, left: layerOffset * 1.8 },
          ]}
        >
          <View style={styles.layerContent}>
            <View>
              <Image
                source={null}
                style={[
                  styles.thumbnail,
                  { width: thumbnailSize, height: thumbnailSize },
                ]}
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
    position: "relative",
    marginLeft: 10,
    transform: "scale(1.12)",
  },
  playList: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    transform: "scale(1.12)",
  },
  songText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold",
  },
  layerContent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 8,
    paddingHorizontal: 2,
  },
  layerBody: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  bgSong: {
    backgroundColor: "#333",
    width: "100%",
    borderRadius: 2,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  relatedTrack: {
    paddingLeft: 8,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  relatedTrackTitle: {
    transform: [{ rotate: "90deg" }],
    color: "#333",
    marginHorizontal: -25,
    overflow: "hidden",
    fontSize: 8,
    fontWeight: "bold",
    fontFamily: "Arial",
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
    backgroundColor: "#685863", // nền nè
    position: "absolute",
  },
  layerOne: {
    zIndex: 3,
    top: 0,
    left: 0,
  },
  layerTwo: {
    zIndex: 2,
  },
  layerThree: {
    zIndex: 1,
  },
  thumbnail: {
    resizeMode: "cover",
  },
});

export default PlayList;
