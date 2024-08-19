import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/";

export const getUserPosts = async (userId) =>
  await axios.get(`${API_URL}users/${userId}`);
