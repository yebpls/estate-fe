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
};
