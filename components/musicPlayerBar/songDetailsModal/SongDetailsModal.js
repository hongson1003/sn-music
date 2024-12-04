import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getImage } from "../../../utils/stringHandler";

const SongDetailsModal = ({
  isModalVisible,
  closeModal,
  currentSong,
  rotation,
  progress,
  handleTogglePlayPause,
  isPlaying,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Ionicons name="close" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Animated.Image
            source={{ uri: getImage(currentSong.thumbnail) }}
            style={[
              styles.modalThumbnail,
              {
                transform: [
                  {
                    rotate: rotation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              },
            ]}
          />
          <Text style={styles.modalTitle}>{currentSong.title}</Text>
          <Text style={styles.modalArtist}>
            {currentSong.artist?.fullName || "Unknown Artist"}
          </Text>
          {/* Thanh progress */}
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, { width: `${progress * 100}%` }]}
            />
          </View>
          <View style={styles.modalControls}>
            <TouchableOpacity
              onPress={handleTogglePlayPause}
              style={styles.modalPlayPauseButton}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={40}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer: {
    backgroundColor: "#2E2E2E",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalArtist: {
    color: "#BBBBBB",
    fontSize: 16,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: "100%",
    height: 5,
    backgroundColor: "#444444",
    borderRadius: 2.5,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FF6347",
  },
  modalControls: {
    flexDirection: "row",
  },
  modalPlayPauseButton: {
    padding: 15,
  },
});

export default SongDetailsModal;
