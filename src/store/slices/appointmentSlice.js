import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appointmentApi } from "../../api/appointmentApi";

const initialState = {
  appointment: null,
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

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppointmentByApartmentId.pending, (state, action) => {
      return { ...state, appointmentLoading: true, isChange: false };
    });
    builder.addCase(getAppointmentByApartmentId.fulfilled, (state, action) => {
      return {
        ...state,
        appointmentByApartment: action.payload,
        appointmentLoading: false,
        isChange: true,
      };
    });
  },
});

export default appointmentSlice.reducer;
