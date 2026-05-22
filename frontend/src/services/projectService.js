import axios from "axios";

const API_URL = "http://localhost:8080/api/projects/my-projects";

export const getProjects = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getProjectById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};