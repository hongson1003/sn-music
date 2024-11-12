// src/utils/axios.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Tạo một instance axios với cấu hình mặc định
const instance = axios.create({
  baseURL: "http://192.168.55.164:8069/api/v1", // Cấu hình URL cơ bản cho API
  timeout: 10000, // Thời gian timeout tối đa là 10s
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors cho request
instance.interceptors.request.use(
  async (config) => {
    // Đánh dấu interceptor này là async
    const token = await AsyncStorage.getItem("userToken");
    console.log("🚀 ~ token:", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptors cho response
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Xử lý lỗi (ví dụ: token hết hạn, API trả về lỗi)
    if (error.response && error.response.status === 401) {
      // Thực hiện logout hoặc chuyển hướng đến màn hình đăng nhập
      console.log("Token hết hạn hoặc không hợp lệ!");
    }
    return Promise.reject(error);
  }
);

export default instance;
