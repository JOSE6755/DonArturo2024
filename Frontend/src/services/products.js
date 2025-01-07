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

export async function getAllProducts({
  price = "ASC",
  size = 5,
  page = 1,
  name = "%%",
  category = null,
}) {
  try {
    const params = { price, size, page, name };
    if (category) params.categories = category;
    const res = await axiosInstance.get("/products/allProducts", {
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

export async function getSingleProduct(productId) {
  try {
    const res = await axiosInstance.get(`/products/${productId}`);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}

export async function createProduct(image, data) {
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("productInfo", JSON.stringify(data));
    const res = await axiosInstance.post("/products", formData);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}

export async function editProduct(productId, data, image) {
  try {
    const formData = new FormData();
    formData.append("productInfo", JSON.stringify(data));
    if (image) {
      formData.append("image", image);
    }
    const res = await axiosInstance.put(`/products/${productId}`, formData);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}

export async function updateProductState(productId, data) {
  try {
    const res = await axiosInstance.put(
      `/products/changeState/${productId}`,
      data
    );
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    throw error.response;
  }
}
