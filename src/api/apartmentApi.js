import axiosClient from "./axiosClient";

export const apartmentApi = {
  getAll() {
    const url = "/api/apartment";
    return axiosClient.get(url);
  },
};
