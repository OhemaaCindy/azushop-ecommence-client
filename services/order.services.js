import { apiEndpoints } from "@/constants/api-endpoints";
import { axiosClient } from "@/lib/axios";
import axios from "axios";

export const addOrder = async (payload) => {
  try {
    const response = await axiosClient.post(apiEndpoints.ORDERS.createOrder, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const payOrder = async (payload) => {
  try {
    const response = await axiosClient.post(apiEndpoints.ORDERS.payOrder, payload);
    return response.data;
  } catch (error) {
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
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const getMyOrders = async () => {
  try {
    const response = await axiosClient.get(apiEndpoints.ORDERS.myOrder);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new (error.response.data).message;
    }else{
      throw new Error("Failed to get orders")
    }
    
  }
};