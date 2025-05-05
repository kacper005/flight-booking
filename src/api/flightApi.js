import axios from "./axiosInstance";

const BASE_URL = "/flights";

export const getFlights = () => axios.get(BASE_URL);
export const getSearchFlights = (params) =>
  axios.get(`${BASE_URL}/search`, { params });
export const getOneWayFlights = () => axios.get(`${BASE_URL}/oneway`);
export const getRoundTripFlights = () => axios.get(`${BASE_URL}/roundtrip`);
export const getFlightById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createFlight = (data) => axios.post(BASE_URL, data);
export const updateFlight = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteFlight = (id) => axios.delete(`${BASE_URL}/${id}`);
export const addPricesToFlight = (flightId, priceData) =>
  axios.post(`${BASE_URL}/${flightId}/prices`, priceData);
