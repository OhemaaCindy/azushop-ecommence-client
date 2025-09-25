import { apiEndpoints } from "@/constants/api-endpoints";
import { axiosClient } from "@/lib/axios";
import axios from "axios";

export const addProduct = async (payload) => {

   const {
    images,
    size,
    color,
    name,
    category,
    description,
    price,
    quantity,
    brand,
    rating,
  } = payload;

  const formData = new FormData();
   //  append multiple images
  if (Array.isArray(images)) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  } else if (images) {
    formData.append("images", images);
  }
  // formData.append("images", images);
  formData.append("size", size);
  formData.append("color", color);
  formData.append("name", name);
  formData.append("categoryId", category);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("quantity", quantity);
  // formData.append("images", images);
  formData.append("brand", brand);
  formData.append("rating", rating);
  try {
    
    console.log("🚀 ~ addProduct ~ formData:", formData);
    
    const response = await axiosClient.post(
      apiEndpoints.PRODUCTS.createProduct,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
      
    return response.data;
  } catch (error) {
    console.log("🚀 ~ addProduct ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const updateProduct = async ({ payload, id }) => {
  try {
    const response = await axiosClient.put(
      apiEndpoints.PRODUCTS.updateProduct(id),
      payload
    );
    return response.data;
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axiosClient.get(apiEndpoints.PRODUCTS.getAllProduct);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ getAllProducts ~ error:", error);

    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const getSingleProduct = async (id) => {
  console.log("🚀 ~ getSingleProduct ~ id:", id);
  try {
    const response = await axiosClient.get(
      apiEndpoints.PRODUCTS.getSingleProduct(id)
    );
    return response.data;
  } catch (error) {
    console.log("🚀 ~ getSingleProduct ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const deleteProduct = async (id ) => {
  try {
    const response = await axiosClient.delete(
      apiEndpoints.PRODUCTS.deleteProduct(id)
    );
    return response.data;
  } catch (error) {
    console.log("🚀 ~ deleteProduct ~ error:", error)
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};
