import axios from "./axiosInstance";

const BASE_URL = "/feedback";

export const getFeedback = () => axios.get(BASE_URL);
export const createFeedback = (data) => axios.post(BASE_URL, data);
export const updateFeedback = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data);
export const deleteFeedback = (id) => axios.delete(`${BASE_URL}/${id}`);
