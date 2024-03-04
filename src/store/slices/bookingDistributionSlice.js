import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookingDistributionApi } from "../../api/bookingDistributionApi";
import { toast } from "react-toastify";

const initialState = {
  bookingDistribution: null,
  isChange: false,
  isLoading: false,
};

export const getAllBookingDistributionByAgencyId = createAsyncThunk(
  "booking_distribution/get_all_by_agencyid",
  async (id) => {
    try {
      const res = await bookingDistributionApi.getAllByAgencyId(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createBookingDistribution = createAsyncThunk(
  "booking_distribution/create",
  async (params) => {
    try {
      const res = await bookingDistributionApi.create(params);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const bookingDistributionSlice = createSlice({
  name: "bookingDistribution",
  initialState,
  reducers: {
    setIsChange: (state, action) => {
      return { ...state, isChange: !state.isChange };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllBookingDistributionByAgencyId.fulfilled,
      (state, action) => {
        return { ...state, bookingDistribution: action.payload };
      }
    );
    builder.addCase(createBookingDistribution.fulfilled, (state, action) => {
      const { bookingDistribution } = state;
      toast.success("Tạo đăng ký bán thành công");
      const newBooking = action.payload;
      const newBookingList = [...bookingDistribution, newBooking];

      return {
        ...state,
        isLoading: false,
        bookingDistribution: newBookingList,
      };
    });
    builder.addCase(createBookingDistribution.rejected, (state, action) => {
      toast.error("Tạo đăng ký bán thất bại");

      return { ...state, isLoading: false };
    });
  },
});

export const { setIsChange } = bookingDistributionSlice.actions;

export default bookingDistributionSlice.reducer;
