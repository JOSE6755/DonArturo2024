import { axiosInstance } from "../config/axios/axios";

export async function getOrdersByUser() {
  try {
    const res = await axiosInstance.get(`/order/user`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw error.response;
  }
}

export async function getOrderDetail(orderId) {
  try {
    const res = await axiosInstance.get(`order/${orderId}`);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}
