import axios from "axios";
import axiosClient from "./axiosClient";

export const appointmentApi = {
  getAllAppointment() {
    const url = "/api/appointment";
    return axiosClient.get(url);
  },
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
  updateMeetingDate(id, date) {
    const url = `/api/appointment/meeting-date/${id}`;
    console.log("api: ", id, date);
    const formattedDate = typeof date === "object" ? date.toISOString() : date;

    // Adjusted to match expected structure: { meetingDate: formattedDate }
    return axiosClient.put(url, { meetingDate: formattedDate });
    // return axiosClient.put(url, date);
  },
};
