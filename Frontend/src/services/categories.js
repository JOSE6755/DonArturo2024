import { axiosInstance } from "../config/axios/axios";

export async function getAllCategories() {
  try {
    const res = await axiosInstance.get("/category");
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}
