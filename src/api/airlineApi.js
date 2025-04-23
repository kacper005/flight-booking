import axios from "./axiosInstance";

const BASE_URL = "/airlines";

export const getAirlines = () => axios.get(BASE_URL);
export const getAirlineById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createAirline = (data) => axios.post(BASE_URL, data);
export const updateAirline = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteAirline = (id) => axios.delete(`${BASE_URL}/${id}`);
