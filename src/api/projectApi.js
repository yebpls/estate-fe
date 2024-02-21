import axiosClient from "./axiosClient";

export const projectApi = {
  getAll(invesId) {
    const url = `/api/project/investor/${invesId}`;
    return axiosClient.get(url);
  },
  getById(id) {
    const url = `/api/project/${id}`;
    return axiosClient.get(url);
  },
  delete(id) {
    const url = `/api/project/delete/${id}`;
    return axiosClient.delete(url);
  },
  create(params) {
    const url = `/api/project/create`;
    return axiosClient.post(url, params);
  },
  update(params, id) {
    const url = `/api/project/update/${id}`;
    return axiosClient.put(url, params);
  },
};
