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
  cancel(id) {
    const url = `/api/booking-distribution/cancel/${id}`;
    return axiosClient.post(url);
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
