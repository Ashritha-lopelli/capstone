import axios from "./axios";

export const register = async (data) => {
  return axios.post("/register", data);
};

export const signin = async (data) => {
  return axios.post("/login", data);
};

export const getCountries = async () => {
  return axios.get("/countries");
};

export const getPackages = async (params) => {
  return axios.get("/packages", {
    params,
  });
};

export const getPackageDetails = async (packageId) => {
  return axios.get(`/packages/${packageId}`);
};

export const getReviews = async (params) => {
  return axios.get("/reviews", { params });
};
