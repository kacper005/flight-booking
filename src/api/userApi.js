import axios from "./axiosInstance";

const BASE_URL = "/users";

export const getUserMe = () => axios.get(`${BASE_URL}/me`);
export const getUsers = () => axios.get(BASE_URL);
export const getUserById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createUser = (data) => axios.post(BASE_URL, data);
export const updateUser = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteUser = (id) => axios.delete(`${BASE_URL}/${id}`);
