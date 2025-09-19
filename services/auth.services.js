import { apiEndpoints } from "@/constants/api-endpoints";
import { axiosClient } from "@/lib/axios";
import axios from "axios";

export const createUser = async (payload) => {
  try {
    const response = await axiosClient.post(apiEndpoints.AUTH.register, payload);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosClient.post(apiEndpoints.AUTH.login, payload);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ loginUser ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

export const checkAuthUser = async () => {
  try {
    const response = await axiosClient.get(apiEndpoints.AUTH.checkAuth);
    console.log("🚀 ~ checkAuthUser ~ response:", response)
    return response.data;
  } catch (error) {
    console.log("🚀 ~ checkAuthUser ~ error:", error)
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
};

// export const checkAuthUser = async () => {
//   try {
//     const response = await axiosClient.get(apiEndpoints.AUTH.checkAuth);
//     console.log("🚀 ~ checkAuthUser ~ response:", response);
//     return response.data; // ✅ always returns something
//   } catch (error) {
//     console.log("🚀 ~ checkAuthUser ~ error:", error);

//     if (axios.isAxiosError(error) && error.response) {
//       // If user is not authenticated (401), return null instead of throwing
//       if (error.response.status === 2) {
//         return null;
//       }
//       throw error.response.data; // other errors
//     }

//     // fallback return to prevent undefined
//     return null;
//   }
// };

export const logout = async () => {
  try {
    const response = await axiosClient.get(apiEndpoints.AUTH.logout);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ logout ~ error:", error)
    
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error("Error logging out")
  }
};