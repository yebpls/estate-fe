import axiosClient from "./axiosClient";

export const apartmentApi = {
  getAll() {
    const url = "/api/apartment";
    return axiosClient.get(url);
  },

  getAllAvailable() {
    const url = "/api/apartment/available";
    return axiosClient.get(url);
  },

  getAllByProjectId(id) {
    const url = `/api/apartment/project/${id}`;
    return axiosClient.get(url);
  },
  getById(id) {
    const url = `/api/apartment/${id}`;
    return axiosClient.get(url);
  },

  create(params) {
    const url = "/api/apartment/create";
    return axiosClient.post(url, params);
  },

  delete(id) {
    const url = `/api/apartment/delete/${id}`;
    return axiosClient.delete(url);
  },

  update(id, params) {
    const url = `/api/apartment/${id}`;
    return axiosClient.put(url, params);
  },
};
