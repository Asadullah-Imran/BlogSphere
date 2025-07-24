import axios from "axios";

const API_BASE_URL = "https://blogsphere-7dt4.onrender.com";
const API_URL = `${API_BASE_URL}/api/v1/`;

export const updateUserData = async (userId, formdata) =>
  await axios.put(`${API_URL}users/${userId}`, formdata, {
    withCredentials: true,
  });

export const getUserProfile = async (userId) =>
  await axios.get(`${API_URL}users/${userId}`);
