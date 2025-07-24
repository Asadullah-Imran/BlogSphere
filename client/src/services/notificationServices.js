import axios from "axios";

const API_BASE_URL = "https://blogsphere-7dt4.onrender.com";
const API_URL = `${API_BASE_URL}/api/v1/notifications/`;

export const getNotifications = (userId) =>
  axios.get(`${API_URL}user/${userId}`);
export const markAsRead = (notificationId) =>
  axios.put(`${API_URL}${notificationId}/read`);
export const deleteNotification = (notificationId) =>
  axios.delete(`${API_URL}${notificationId}`);
