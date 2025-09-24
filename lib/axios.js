


import axios from "axios";
import { BASEURL } from "../constants/api-endpoints";

export const axiosClient = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        //  Clear token but don't redirect automatically
        localStorage.removeItem("token");
        // This prevents redirect loops and allows React Query to work properly
        const authError = new Error("Authentication failed");
        authError.status = 401;
        return Promise.reject(authError);
        
      } else if (error.response.status === 500) {
        return Promise.reject(
          new Error("Server error. Please try again later.")
        );
      }
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject(
        new Error("Request timeout. Please try again later.")
      );
    }

    return Promise.reject(error);
  }
);