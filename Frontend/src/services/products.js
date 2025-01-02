import { axiosInstance } from "../config/axios/axios";

export async function getAllActiveProducts({
  price = "ASC",
  size = 5,
  page = 1,
  name = "%%",
  category = null,
}) {
  try {
    const params = { price, size, page, name };
    if (category) params.categories = category;
    const res = await axiosInstance.get("/products", {
      params,
    });
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}
