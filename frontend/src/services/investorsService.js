import axios from "axios";
import { getToken } from "./tokenService";

const investorsUrl = "http://localhost:8080/api/admin/investors";

export const getInvestorsApi = async () => {
  //   const token = getToken(); note i'll decomment this later
  // it's just a token for test.
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBmMDYzMTgzNGM1NzRiOTNiYWU3YzYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzkzNjk1MzUsImV4cCI6MTc3OTU0MjMzNX0.sEgO9NLxEi_XaGz0-EN0mZqYZYBzuRDGCyDiq-VukZ0";
  try {
    const response = await axios.get(investorsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Something went wrong",
      status: error.response?.status,
    };
  }
};
