import axiosClient from "./axiosClient";

export const contractApi = {
  getContractByAppointment(id) {
    const url = `/api/contract/by-appointment/${id}`;
    return axiosClient.get(url);
  },
  getContractByApart(id) {
    const url = `/api/agency/apartment/${id}`;
    return axiosClient.get(url);
  },
};
