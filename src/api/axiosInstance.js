import axios from "axios";

const apiUrl = import.meta.env.VITE_FLIGHT_FINDER_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
