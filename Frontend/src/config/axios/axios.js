import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const excludedUrls = ["/auth/login"];
axiosInstance.interceptors.request.use(
  (config) => {
    const normalizedUrl = new URL(config.url, config.baseURL).pathname;
    if (!excludedUrls.includes(normalizedUrl)) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
