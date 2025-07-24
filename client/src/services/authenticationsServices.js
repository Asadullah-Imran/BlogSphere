import axios from "axios";

const API_BASE_URL = "https://blogsphere-7dt4.onrender.com";
const API_URL = `${API_BASE_URL}/api/v1/auth/`;

export const register = (credentials) => {
  return axios.post(`${API_URL}register`, credentials);
};
export const login = (credentials) => {
  return axios.post(`${API_URL}login`, credentials, {
    withCredentials: true, // This ensures that cookies are sent and received
  });
};
export const verifyEmail = (id, token) => {
  return axios.get(`${API_URL}verify-email?id=${id}&token=${token}`);
};
export const logout = () =>
  axios.post(
    `${API_URL}logout`,
    {},
    {
      withCredentials: true, // This ensures that cookies are sent and received
    }
  );
export const refreshToken = () => axios.post(`${API_URL}refresh-token`);

export const resendVerificationEmail = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_URL}resend-verification-email`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error in resendVerificationEmail:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
