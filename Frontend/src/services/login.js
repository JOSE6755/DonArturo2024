import { axiosInstance } from "../config/axios/axios";
export async function login({ email, password }) {
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      return true;
    }
  } catch (error) {
    throw error.response;
  }
}
