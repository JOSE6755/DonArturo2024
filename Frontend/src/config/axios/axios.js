import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const excludedUrls = ["/auth/login", "/users/register"];
axiosInstance.interceptors.request.use(
  (config) => {
    const normalizedUrl = new URL(config.url, config.baseURL).pathname;
    if (!excludedUrls.includes(normalizedUrl)) {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const token = userInfo.token;
      config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("user");
    }
  }
);

export { axiosInstance };
