import axiosClient from "./axiosClient";

export const cityApi = {
  getAll() {
    const url = "/api/city";
    return axiosClient.get(url);
  },
};
