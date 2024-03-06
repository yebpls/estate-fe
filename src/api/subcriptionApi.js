import axiosClient from "./axiosClient";

export const subcriptionApi = {
  createSubcription(params) {
    const url = `/api/subscription/create`;
    return axiosClient.post(url, params);
  },
  getByAppointmentId(id) {
    const url = `/api/subscription/appointment/${id}`;
    return axiosClient.get(url, id);
  },
};
