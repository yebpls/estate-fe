import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appointmentApi } from "../../api/appointmentApi";
import { toast } from "react-toastify";
import { updateStatusBySubcriptionId } from "./subcriptionSlice";
import { apartmentApi } from "../../api/apartmentApi";

const initialState = {
  appointment: null,
  appointments: null,
  appointmentByApartment: null,
  appointmentLoading: false,
  isChange: false,
};

export const getAppointmentByDistributionId = createAsyncThunk(
  "appointment/get_by_distributionId",
  async (id) => {
    try {
      const res = await appointmentApi.getAppointmentByDistributionId(id);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllAppointment = createAsyncThunk(
  "appointment/get_all",
  async () => {
    try {
      const res = await appointmentApi.getAllAppointment();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAppointmentByApartmentId = createAsyncThunk(
  "appointment/get_by_apartmentId",
  async (id) => {
    try {
      const res = await appointmentApi.getAppointmentByApartmentId(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateMeetingDate = createAsyncThunk(
  "appointment/update_by_id",
  async ({ id, date }) => {
    try {
      const res = await appointmentApi.updateMeetingDate(id, date);
      console.log("slice: ", date, id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const soldApartment = createAsyncThunk(
  "appointment/is_sold",
  async ({ appointId, subId }) => {
    try {
      const res = await appointmentApi.setIsSoldApartment(appointId, subId);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppointmentByApartmentId.pending, (state, action) => {
      return { ...state, appointmentLoading: true, isChange: false };
    });
    builder.addCase(getAppointmentByApartmentId.fulfilled, (state, action) => {
      const newAppoint = action.payload;
      const newMeetingDate = new Date(action.payload.meetingDate);
      newMeetingDate.setDate(newMeetingDate.getDate() + 1);
      console.log("new date in appoint slice: ", newMeetingDate.toISOString());
      const newAppointment = {
        ...newAppoint,
        meetingDate: newMeetingDate.toISOString(),
      };
      console.log("newAppointment:", newAppointment);
      return {
        ...state,
        appointmentByApartment: newAppointment,
        appointmentLoading: false,
        isChange: true,
      };
    });
    builder.addCase(getAppointmentByApartmentId.rejected, (state, action) => {
      return { ...state, appointmentLoading: false, isChange: false };
    });
    builder.addCase(updateMeetingDate.pending, (state, action) => {
      return { ...state, appointmentLoading: true };
    });
    builder.addCase(updateMeetingDate.fulfilled, (state, action) => {
      const { appointmentByApartment } = state;
      const newMeetingDate = new Date(action.payload.meetingDate);
      const newAppointment = {
        ...appointmentByApartment,
        meetingDate: newMeetingDate.toISOString(),
      };
      return {
        ...state,
        appointmentByApartment: newAppointment,
        appointmentLoading: false,
      };
    });
    builder.addCase(updateStatusBySubcriptionId.fulfilled, (state, action) => {
      const { appointmentByApartment } = state;
      const newAppointStatus = action.meta.arg?.status - 1;
      console.log("status update: ", newAppointStatus);
      const newAppointment = {
        ...appointmentByApartment,
        appointmentStatus: newAppointStatus,
      };
      return {
        ...state,
        appointmentByApartment: newAppointment,
      };
    });
    builder.addCase(updateMeetingDate.rejected, (state, action) => {
      return { ...state, appointmentLoading: false };
    });
    builder.addCase(soldApartment.pending, (state, action) => {
      return { ...state, loadingSold: true };
    });
    builder.addCase(soldApartment.fulfilled, (state, action) => {
      toast.success("Đã bán căn hộ thành công");
      return { ...state, loadingSold: false };
    });
    builder.addCase(soldApartment.rejected, (state, action) => {
      return { ...state, loadingSold: false };
    });
    builder.addCase(getAllAppointment.pending, (state, action) => {
      return { ...state, appointmentLoading: true };
    });
    builder.addCase(getAllAppointment.fulfilled, (state, action) => {
      return {
        ...state,
        appointmentLoading: false,
        appointments: action.payload,
      };
    });
    builder.addCase(getAllAppointment.rejected, (state, action) => {
      return { ...state, appointmentLoading: false };
    });
  },
});

export default appointmentSlice.reducer;
