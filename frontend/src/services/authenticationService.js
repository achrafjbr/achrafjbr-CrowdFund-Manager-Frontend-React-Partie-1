import axios from "axios";

const loginUserApi = async (userCredentials) => {
  const response = await axios.post(
    "http://localhost:8080/auth/login",
    userCredentials,
  );

  return response;
};

const registerUserApi = async () => {};

export { loginUserApi, registerUserApi };
