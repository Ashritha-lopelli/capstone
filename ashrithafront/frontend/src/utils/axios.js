import Axios from "axios";

const API_BASE_URL = "http://localhost:4545";

const axios = Axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  retryOnTimeout: false,
});

export default axios;
