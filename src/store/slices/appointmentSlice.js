import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appointmentApi } from "../../api/appointmentApi";
import { toast } from "react-toastify";

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
      return {
        ...state,
        appointmentByApartment: action.payload,
        appointmentLoading: false,
        isChange: true,
      };
    });
    builder.addCase(getAppointmentByApartmentId.rejected, (state, action) => {
      return { ...state, appointmentLoading: false, isChange: false };
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
  },
});

export default appointmentSlice.reducer;
