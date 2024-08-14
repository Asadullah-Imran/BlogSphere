import axios from "axios";

const API_URL = "/api/comments/";

export const getComments = (postId) => axios.get(`${API_URL}post/${postId}`);
export const createComment = (postId, comment) =>
  axios.post(`${API_URL}post/${postId}`, comment);
export const updateComment = (commentId, comment) =>
  axios.put(`${API_URL}${commentId}`, comment);
export const deleteComment = (commentId) =>
  axios.delete(`${API_URL}${commentId}`);
