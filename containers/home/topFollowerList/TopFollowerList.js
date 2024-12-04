import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal"; // Import react-native-modal
import { useDispatch } from "react-redux";
import { FollowerItem } from "../../../components/followerItem";
import { setCurrentSong } from "../../../redux/features/songSlice";
import userService from "../../../services/userService";
import { getImage } from "../../../utils/stringHandler";

const TopFollowerList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [selectedFollower, setSelectedFollower] = useState(null); // State to store the selected follower's data
  const dispatch = useDispatch();

  const fetchFollowers = async () => {
    try {
      const res = await userService.getTopFollowers();
      setData(res);
    } catch (error) {
      console.log("🚀 ~ fetchFollowers ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, []);

  const handleOnPress = (song) => {
    fetchUpdateInteraction(song.id, song.duration);
    dispatch(setCurrentSong(song));
  };

  const handleFollowerPress = (follower) => {
    setSelectedFollower(follower);
    setModalVisible(true); // Show the modal when a follower is clicked
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleFollowerPress(item)}
    >
      <FollowerItem follower={item} />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top người dùng có follower cao nhất</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Không có Top người dùng có follower cao nhất nào
          </Text>
        }
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />

      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)} // Close modal on backdrop press
        onBackButtonPress={() => setModalVisible(false)} // Close modal on back button press
      >
        <View style={styles.modalContent}>
          {selectedFollower && (
            <>
              <Image
                source={{ uri: getImage(selectedFollower.avatar) }}
                style={styles.modalAvatar}
              />
              <Text style={styles.modalName}>{selectedFollower.fullName}</Text>
              <Text style={styles.modalEmail}>{selectedFollower.email}</Text>
              <Text style={styles.modalFollowers}>
                Followers: {selectedFollower.followersCount}
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Đóng</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  list: {
    padding: 10,
  },
  item: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    marginRight: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalEmail: {
    color: "#FFFFFF",
    fontSize: 16,
    marginVertical: 10,
  },
  modalFollowers: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  modalCloseButton: {
    backgroundColor: "#FF5C5C",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  modalCloseText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default TopFollowerList;
