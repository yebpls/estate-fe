import axiosClient from "./axiosClient";

export const bookingDistributionApi = {
  getAllByAgencyId(id) {
    const url = `/api/booking-distribution/agency/${id}`;
    return axiosClient.get(url);
  },
  create(params) {
    const url = `/api/booking-distribution/create`;
    return axiosClient.post(url, params);
  },
  // getAllByProjectId(id) {
  //   const url = `/api/booking-distribution/`;
  //   return axiosClient.get(url);
  // },
  // getById(id) {
  //   const url = `/api/booking-distribution/`;
  //   return axiosClient.get(url);
  // },

  // create(params) {
  //   const url = `/api/booking-distribution/`;
  //   return axiosClient.post(url, params);
  // },

  // delete(id) {
  //   const url = `/api/booking-distribution/`;
  //   return axiosClient.delete(url);
  // },

  // update(id, params) {
  //   const url = `/api/booking-distribution/`;
  //   return axiosClient.put(url, params);
  // },
};
