import axios from "./axiosInstance";

const BASE_URL = "/airports";

export const getAirports = () => axios.get(BASE_URL);
export const getAirportById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createAirport = (data) => axios.post(BASE_URL, data);
export const updateAirport = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteAirport = (id) => axios.delete(`${BASE_URL}/${id}`);
export const getAirportsArray = () =>
  axios.get(BASE_URL).then((response) => response.data);
