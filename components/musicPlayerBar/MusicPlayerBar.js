import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { togglePlayPause } from "../../redux/features/songSlice";
import { getImage } from "../../utils/stringHandler";

const MusicPlayerBar = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.song);

  const [sound, setSound] = useState(null); // State để lưu sound hiện tại
  const [isBuffering, setIsBuffering] = useState(false); // Trạng thái buffering
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải nhạc
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái modal
  const rotation = useState(new Animated.Value(0))[0]; // Animated giá trị xoay

  // Khi có sự thay đổi bài hát, dừng bài cũ và phát bài mới
  useEffect(() => {
    if (currentSong) {
      // Dừng bài hát hiện tại nếu có trước khi phát bài mới
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
  }, [currentSong]); // Mỗi khi bài hát thay đổi, gọi useEffect

  // Bắt đầu phát bài hát
  const playSong = async (url) => {
    setIsLoading(true); // Bắt đầu tải nhạc
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: `https://drive.google.com/uc?export=download&id=${url}` }, // Sử dụng file ID để tạo URL âm thanh
        { shouldPlay: isPlaying, isLooping: false },
        onPlaybackStatusUpdate
      );
      setSound(sound); // Lưu đối tượng sound vào state
      setIsLoading(false); // Tải xong, ẩn loading
    } catch (error) {
      console.log("Error loading or playing sound:", error);
      setIsLoading(false); // Nếu lỗi, ẩn loading
    }
  };

  // Cập nhật trạng thái khi nhạc phát hoặc kết thúc
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      if (status.didJustFinish) {
        dispatch(togglePlayPause()); // Khi nhạc kết thúc, tự động chuyển trạng thái play/pause
      }
    }
  };

  // Chuyển trạng thái play/pause
  const handleTogglePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync(); // Dừng nhạc
    } else {
      await sound.playAsync(); // Phát nhạc
    }
    dispatch(togglePlayPause()); // Chuyển trạng thái play/pause trong Redux
  };

  // Mở modal
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  // Đóng modal
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
  }, [isPlaying]); // Khi trạng thái isPlaying thay đổi, gọi lại effect

  if (!currentSong) return null;

  return (
    <View style={styles.container}>
      {/* Hiển thị thông tin bài hát */}
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

      {/* Nút Play/Pause */}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.closeButton}
            >
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
    width: 60, // Kích thước lớn hơn một chút
    height: 60, // Kích thước lớn hơn một chút
    borderRadius: 30, // Làm cho nó tròn
    marginRight: 10,
    borderWidth: 2, // Thêm đường viền để đẹp hơn
    borderColor: "#FFFFFF", // Màu đường viền trắng
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
  modalControls: {
    flexDirection: "row",
  },
  modalPlayPauseButton: {
    padding: 15,
  },
});

export default MusicPlayerBar;
