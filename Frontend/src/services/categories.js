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

export async function createCategory(name) {
  try {
    const res = await axiosInstance.post("/category", { name: name });
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}

export async function updateCategory(categoryId, name) {
  try {
    const res = await axiosInstance.put(`/category/${categoryId}`, {
      name: name,
    });
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}
export async function updateCategoryState(categoryId, stateId) {
  try {
    const res = await axiosInstance.put(`/category/state/${categoryId}`, {
      stateId: stateId,
    });
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}
