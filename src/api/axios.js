import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// apiClient.interceptors.request.use(
//   function (config) {
//     const token = LocalStorage.get("token");
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export const loginUser = (data) => {
  return apiClient.post("/Auth/login", data, { withCredentials: true });
};

export const registerUser = (data) => {
  return apiClient.post("/Auth/register", data);
};

export const accessTokenRequest = (data) => {
  return apiClient.post("/Auth/refresh-token", data, { withCredentials: true });
};
