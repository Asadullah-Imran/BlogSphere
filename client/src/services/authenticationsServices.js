import axios from "axios";

const API_URL = "https://blog-app-eta-orcin.vercel.app/api/v1/auth/";

export const register = (credentials) => {
  return axios.post(`${API_URL}register`, credentials);
};
export const login = (credentials) => {
  return axios.post(`${API_URL}login`, credentials);
};
export const verifyEmail = (id, token) => {
  return axios.get(`${API_URL}verify-email?id=${id}&token=${token}`);
};
export const logout = () => axios.post(`${API_URL}logout`);
export const refreshToken = () => axios.post(`${API_URL}refresh-token`);
