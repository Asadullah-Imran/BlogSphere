import axios from "axios";

const API_URL = "/api/users/";

export const registerUser = (userData) =>
  axios.post(`${API_URL}register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}login`, userData);
export const getUserProfile = (id) => axios.get(`${API_URL}${id}`);
export const updateUserProfile = (id, userData) =>
  axios.put(`${API_URL}${id}`, userData);
export const deleteUser = (id) => axios.delete(`${API_URL}${id}`);
