import axios from "axios";
import { getToken } from "./tokenService";
const addBalanceAPI = async (amount) => {
  const token = getToken();
  try {
    const response = await axios.post(
      "http://localhost:8080/api/investments/balance",
      { amount: amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Something went wrong",
      status: error.response?.status,
    };
  }
};

// this method includes all current user data including the balnce
const getMeAPI = async () => {
  const token = getToken();

  try {
    const response = await axios.get(
      "http://localhost:8080/api/investments/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Something went wrong",
      status: error.response?.status,
    };
  }
};

const myInvestisemetAPI = async () => {
  const token = getToken();

  try {
    const response = await axios.get(
      "http://localhost:8080/api/investments/my-investments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Something went wrong",
      status: error.response?.status,
    };
  }
};

export { addBalanceAPI, getMeAPI, myInvestisemetAPI };
