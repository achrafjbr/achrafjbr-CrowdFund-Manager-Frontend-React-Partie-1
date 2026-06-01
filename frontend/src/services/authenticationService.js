import axios from "axios";

const loginUserApi = async (userCredentials) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/auth/login",
      userCredentials,
    );
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Something went wrong",
      status: error.response?.status,
    };
  }
};

const registerUserApi = async (userCredentials) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/auth/register",
      userCredentials,
    );
    console.log("response in Api", response.data);
    return response.data;
  } catch (error) {
    console.log("error...............", error);
    throw {
      message: error.response?.data?.message || "Something went wrong",
      status: error.response?.status,
    };
  }
};

export { loginUserApi, registerUserApi };
