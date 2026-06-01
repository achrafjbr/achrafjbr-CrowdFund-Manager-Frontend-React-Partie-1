import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
const TOKEN_KEY = "token";

const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const getToken = () => localStorage.getItem(TOKEN_KEY);
const deleteToken = () => localStorage.removeItem(TOKEN_KEY);

const decodeToken = () => {
  const token = getToken();
  if (!token) return null;
  const { userId, role } = jwtDecode(token);
  return {
    userId,
    role,
  };
};

export { setToken, getToken, deleteToken, decodeToken, TOKEN_KEY };
