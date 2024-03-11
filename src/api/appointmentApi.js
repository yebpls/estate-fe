import axiosClient from "./axiosClient";

export const appointmentApi = {
  getAppointmentByDistributionId(id) {
    const url = `/api/appointment/booking-distribution/${id}`;
    return axiosClient.get(url);
  },
  getAppointmentByApartmentId(id) {
    const url = `/api/appointment/apartment/${id}`;
    return axiosClient.get(url);
  },
  setIsSoldApartment(appointId, subId) {
    const url = `/api/appointment/is-sold?appointId=${appointId}&subId=${subId}`;
    return axiosClient.put(url);
  },
};
