import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { togglePlayPause } from "../../redux/features/songSlice";
import { getDriveDownloadUrl, getImage } from "../../utils/stringHandler";
import { SongDetailsModal } from "./songDetailsModal";

const MusicPlayerBar = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.song);

  const [sound, setSound] = useState(null); // State để lưu sound hiện tại
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải nhạc
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái modal
  const [progress, setProgress] = useState(0); // Thanh progress
  const rotation = useState(new Animated.Value(0))[0]; // Animated giá trị xoay

  useEffect(() => {
    if (currentSong) {
      if (sound) {
        sound.stopAsync(); // Dừng nhạc hiện tại
        sound.unloadAsync(); // Giải phóng tài nguyên âm thanh
      }
      playSong(currentSong.url); // Phát bài mới
    }

    return () => {
      if (sound) {
        sound.stopAsync(); // Dừng bài hát khi component bị hủy
        sound.unloadAsync(); // Giải phóng tài nguyên âm thanh
      }
    };
  }, [currentSong]);

  const playSong = async (url) => {
    setIsLoading(true); // Bắt đầu tải nhạc
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: getDriveDownloadUrl(url) },
        { shouldPlay: isPlaying, isLooping: false },
        onPlaybackStatusUpdate
      );
      setSound(sound);
      setIsLoading(false); // Tải xong, ẩn loading
    } catch (error) {
      console.log("Error loading or playing sound:", error);
      setIsLoading(false); // Nếu lỗi, ẩn loading
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      if (status.positionMillis && status.durationMillis) {
        const progress = status.positionMillis / status.durationMillis;
        setProgress(progress); // Cập nhật progress
      }
    }
  };

  const handleTogglePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync(); // Dừng nhạc
    } else {
      await sound.playAsync(); // Phát nhạc
    }
    dispatch(togglePlayPause()); // Chuyển trạng thái play/pause trong Redux
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Xoay ảnh thumbnail khi nhạc đang phát
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 10000, // Thời gian một vòng quay
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotation.stopAnimation(); // Dừng quay khi nhạc không phát
    }
  }, [isPlaying]);

  if (!currentSong) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleOpenModal}
        style={styles.musicInfoContainer}
      >
        <Animated.Image
          source={{ uri: getImage(currentSong.thumbnail) }}
          style={[
            styles.thumbnail,
            {
              transform: [
                {
                  rotate: rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"], // Quay 360 độ
                  }),
                },
              ],
            },
          ]}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{currentSong.title}</Text>
          <Text style={styles.artist}>
            {currentSong.artist?.fullName || "Unknown Artist"}
          </Text>
        </View>
        <Ionicons name="chevron-up" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
      ) : (
        <TouchableOpacity
          onPress={handleTogglePlayPause}
          style={styles.playPauseButton}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      )}

      {/* Modal hiển thị chi tiết bài hát */}
      <SongDetailsModal
        isModalVisible={isModalVisible}
        closeModal={handleCloseModal}
        currentSong={currentSong}
        rotation={rotation}
        progress={progress}
        handleTogglePlayPause={handleTogglePlayPause}
        isPlaying={isPlaying}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1E1E1E",
    padding: 10,
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
  },
  musicInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  artist: {
    color: "#BBBBBB",
    fontSize: 14,
  },
  playPauseButton: {
    padding: 10,
  },
  loader: {
    marginLeft: 10,
  },
});

export default MusicPlayerBar;
