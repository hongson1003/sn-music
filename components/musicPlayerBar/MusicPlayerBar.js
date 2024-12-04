import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
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

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      if (status.didJustFinish) {
        dispatch(togglePlayPause()); // Khi nhạc kết thúc, tự động chuyển trạng thái play/pause
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

  if (!currentSong) return null;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: getImage(currentSong.thumbnail) }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{currentSong.title}</Text>
        <Text style={styles.artist}>
          {currentSong.artist?.fullName || "Unknown Artist"}
        </Text>
      </View>

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
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
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
