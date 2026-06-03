import axios from "axios";
import { getToken } from "./tokenService";

export const getInvestmentApi = async () => {
  const response = await axios.get(
    "http://localhost:8080/api/investments/my-investments",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  console.log(response);

  return response.data;
};
