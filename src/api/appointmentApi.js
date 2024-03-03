import axiosClient from "./axiosClient";

export const appointmentApi = {
  getAppointmentByDistributionId(id) {
    const url = `/api/appointment/booking-distribution/${id}`;
    return axiosClient.get(url);
  },
};
