import { axiosInstance } from "../config/axios/axios";

export async function getAllBrands() {
  try {
    const res = await axiosInstance.get("/brands");
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}

export async function createBrand(name) {
  try {
    const res = await axiosInstance.post("/brands", { name: name });
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}

export async function updateBrand(brandId, name) {
  try {
    const res = await axiosInstance.put(`/brands/${brandId}`, { name: name });
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}
