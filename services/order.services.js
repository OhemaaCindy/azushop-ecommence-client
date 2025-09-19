import { apiEndpoints } from "@/constants/api-endpoints";
import { axiosClient } from "@/lib/axios";
import axios from "axios";

export const addOrder = async (payload) => {
  try {
    const response = await axiosClient.post(apiEndpoints.ORDERS.createOrder, payload);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const payOrder = async (payload) => {
  try {
    const response = await axiosClient.put(apiEndpoints.ORDERS.payOrder, payload);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const getAllOrders= async () => {
  try {
    const response = await axiosClient.get(apiEndpoints.ORDERS.getAllOrders );
    return response.data;
  } catch (error) {
   console.log("🚀 ~ getAllOrders ~ error:", error)
   
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const getSingleOrder = async ({id}) => {
  try {
    const response = await axiosClient.get(apiEndpoints.ORDERS.getSingleOrder);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};