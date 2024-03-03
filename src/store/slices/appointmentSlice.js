import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appointmentApi } from "../../api/appointmentApi";

const initialState = {
  appointment: null,
  isLoading: false,
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

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default appointmentSlice.reducer;
