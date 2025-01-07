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

export async function getUsers() {
  try {
    const res = await axiosInstance.get("/users");
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}

export async function getUserById(userId) {
  try {
    const res = await axiosInstance.get(`/users/${userId}`);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}

export async function updateUser(userId, data) {
  try {
    const res = await axiosInstance.put(`/users/${userId}`, data);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}

export async function changeUserState(userId, stateId) {
  try {
    const res = await axiosInstance.put(`/users/state/${userId}`, {
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
