import { apiEndpoints } from "@/constants/api-endpoints";
import { axiosClient } from "@/lib/axios";
import axios from "axios";

export const addProduct = async (payload) => {
  try {
    const response = await axiosClient.post(apiEndpoints.PRODUCTS.createProduct, payload);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const updateProduct = async ({payload,id}) => {
  try {
    const response = await axiosClient.put(apiEndpoints.PRODUCTS.updateProduct(id), payload);
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
    const response = await axiosClient.get(apiEndpoints.PRODUCTS.getAllProduct );
    return response.data;
  } catch (error) {
   console.log("🚀 ~ getAllProducts ~ error:", error)
   
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const getSingleProduct = async ({id}) => {
  try {
    const response = await axiosClient.get(apiEndpoints.PRODUCTS.getSingleProduct(id));
    return response.data;
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

// export const deleteProduct = async ({id}) => {
//   try {
//     const response = await axiosClient.get(apiEndpoints.PRODUCTS.deleteCategory(id));
//     return response.data;
//   } catch (error) {
//     console.log("🚀 ~ registerUser ~ error:", error);
//     if (axios.isAxiosError(error) && error.response) {
//       throw error.response.data;
//     }
//   }
// };