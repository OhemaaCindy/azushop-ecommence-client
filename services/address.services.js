import { apiEndpoints } from "@/constants/api-endpoints";
import { axiosClient } from "@/lib/axios";

export const createAddress = async (payload) => {
  try {
    const response = await axiosClient.post(apiEndpoints.ADDRESS.createAddress, payload);
    return response.data;
  } catch (error) {
    // console.log("🚀 ~ createAddress ~ error:", error)
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const getAddress = async () => {
  try {
    const response = await axiosClient.get(apiEndpoints.ADDRESS.getAddress);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ createAddress ~ error:", error)
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};