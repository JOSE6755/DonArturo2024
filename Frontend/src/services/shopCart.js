import { axiosInstance } from "../config/axios/axios";

export async function insertCart({
  quantity,
  price,
  subTotal,
  productId,
  shopCartId,
}) {
  try {
    const res = await axiosInstance.post(`/shopCart/${shopCartId}`, {
      quantity,
      price,
      subTotal,
      productId,
    });
    if (res.status === 200) {
      return res;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}

export async function getShopCart(shopCartId) {
  try {
    const res = await axiosInstance.get(`/shopCart/${shopCartId}`);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}

export async function removeProductFromShopCart(shopCartId, productId) {
  try {
    const res = await axiosInstance.put(
      `/shopCart/removeProduct/${shopCartId}`,
      { productId: productId }
    );
    if (res.status === 200) {
      return res.data;
    }

    return null;
  } catch (error) {
    throw error.response;
  }
}

export async function emptyShopCart(shopCartId) {
  try {
    const res = await axiosInstance.put(`/shopCart/emptyCart/${shopCartId}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function confirmOrder(total) {
  try {
    const res = await axiosInstance.post("/order", { total: total });
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}
