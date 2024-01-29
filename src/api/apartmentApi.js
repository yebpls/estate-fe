import axiosClient from "./axiosClient";

export const apartmentApi = {
  getAll() {
    const url = "/api/apartment";
    return axiosClient.get(url);
  },
  getApartmentById(id) {
    const url = `api/apartment/${id}`;
    return axiosClient.get(url);
  },
};
