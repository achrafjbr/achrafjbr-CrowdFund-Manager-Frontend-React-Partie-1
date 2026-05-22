import { jwtDecode } from "jwt-decode";
const TOKEN_KEY = "token";

const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const getToken = () => localStorage.getItem(TOKEN_KEY);
const deleteToken = () => localStorage.removeItem(TOKEN_KEY);

const decodeToken = () => {
  const token = getToken();

  if (!token) return null;

  try {
    const { userId, role } = jwtDecode(token);
    return {
      userId,
      role,
    };
  } catch (error) {
    return null;
  }
};

export { setToken, getToken, deleteToken, decodeToken, TOKEN_KEY };
