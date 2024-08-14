import axios from "axios";

const API_URL = "/api/auth/";

export const register = (credentials) =>
  axios.post(`${API_URL}register`, credentials);
export const login = (credentials) =>
  axios.post(`${API_URL}login`, credentials);
export const logout = () => axios.post(`${API_URL}logout`);
export const refreshToken = () => axios.post(`${API_URL}refresh-token`);
