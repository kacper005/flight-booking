import axios from "./axiosInstance";

const BASE_URL = "/bookings";

export const getBookings = () => axios.get(BASE_URL);
export const getBookingById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createBooking = (data) => axios.post(BASE_URL, data);
export const updateBooking = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteBooking = (id) => axios.delete(`${BASE_URL}/${id}`);
