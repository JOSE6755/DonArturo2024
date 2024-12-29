import { axiosInstance } from "../config/axios/axios";

export async function createUser(data) {
  try {
    const res = await axiosInstance.post("/users/register", data);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    throw error.response;
  }
}
