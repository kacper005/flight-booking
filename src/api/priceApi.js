import axios from "./axiosInstance";

const BASE_URL = "/prices";

export const getPrices = () => axios.get(BASE_URL);
export const getPriceById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createPrice = (data) => axios.post(BASE_URL, data);
export const updatePrice = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deletePrice = (id) => axios.delete(`${BASE_URL}/${id}`);
