import axios from "./axiosInstance";

const BASE_URL = "/auth/login";

export const signIn = (data) => axios.post(BASE_URL, data);
