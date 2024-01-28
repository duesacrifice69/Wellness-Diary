import axios from "axios";
import { useAuth } from "../context/AuthContext";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

apiClient.interceptors.request.use(
  function (config) {
    const { token } = useAuth();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const loginUser = (data) => {
  return apiClient.post("/user/login", data);
};

const registerUser = (data) => {
  return apiClient.post("/user/register", data);
};

const logoutUser = () => {
  return apiClient.post("/user/logout");
};

export { loginUser, logoutUser, registerUser };
