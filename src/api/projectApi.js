import axiosClient from "./axiosClient";

export const projectApi = {
  getAll(invesId) {
    const url = `/api/project/${invesId}`;
    return axiosClient.get(url);
  },
  // getById(id) {
  //   const url = `/api/apartment/${id}`;
  //   return axiosClient.get(url);
  // },
};
