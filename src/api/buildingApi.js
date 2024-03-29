import axiosClient from "./axiosClient";

export const buildingApi = {
  getAll() {
    const url = "/api/building";
    return axiosClient.get(url);
  },
  getAllByProject(id) {
    const url = `/api/building/project/${id}`;
    return axiosClient.get(url);
  },
  createBuilding(params) {
    const url = "/api/building/create";
    return axiosClient.post(url, params);
  },
  updateBuilding(params, id) {
    const url = `/api/building/${id}`;
    return axiosClient.put(url, params);
  },
  deleteBuilding(id) {
    const url = `/api/building/delete/${id}`;
    return axiosClient.delete(url);
  },
};
