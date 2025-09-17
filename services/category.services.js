import { apiEndpoints } from "@/constants/api-endpoints";
import { axiosClient } from "@/lib/axios";
import axios from "axios";

export const addCategory = async (payload) => {
  try {
    const response = await axiosClient.post(apiEndpoints.CATEGORY.createCategory, payload);
    return response.data;
  } catch (error) {
   console.log("🚀 ~ addCategory ~ error:", error)
   
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const updateCategory = async ({payload,id}) => {
  try {
    const response = await axiosClient.put(apiEndpoints.CATEGORY.updateCategory(id), payload);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axiosClient.get(apiEndpoints.CATEGORY.getAllCategories );
    return response.data;
  } catch (error) {
    console.log("🚀 ~ getAllCategories ~ error:", error)
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const getSingleCategory = async ({id}) => {
  try {
    const response = await axiosClient.get(apiEndpoints.CATEGORY.getSingleCategory(id));
    return response.data;
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const deleteCategory = async ({id}) => {
  try {
    const response = await axiosClient.get(apiEndpoints.CATEGORY.deleteCategory(id));
    return response.data;
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};