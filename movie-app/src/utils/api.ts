import axios from "axios";
import { ENV } from "@/config";

export const fetchFromAPI = async (endpoint: string, queryParams = {}) => {
  try {
    const response = await axios.get(`${ENV.BASE_URL}${endpoint}`, {
      params: { api_key: ENV.API_KEY, ...queryParams },
    });
    return response.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};
