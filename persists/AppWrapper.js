import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LoadingScreen } from "../components";
import MusicPlayerBar from "../components/musicPlayerBar/MusicPlayerBar";
import APP_KEYS from "../constants/appKeys";
import { login } from "../redux/features/userSlice";
import userService from "../services/userService";

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleDetectToken = async () => {
      const token = await AsyncStorage.getItem(APP_KEYS.ACCESS_TOKEN);
      if (token) {
        try {
          const res = await userService.getMe(token);
          if (res) {
            await dispatch(login(res));
          }
        } catch (error) {
          console.log("🚀 ~ handleDetectToken ~ error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    handleDetectToken();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {children}
      <MusicPlayerBar />
    </>
  );
};

export default AppWrapper;
