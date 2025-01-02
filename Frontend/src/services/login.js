import { axiosInstance } from "../config/axios/axios";
export async function login({ email, password }) {
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });
    if (res.status === 200) {
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}
