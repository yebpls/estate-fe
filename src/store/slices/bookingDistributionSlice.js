import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookingDistributionApi } from "../../api/bookingDistributionApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateAvailableApartment } from "./apartmentSlice";

const initialState = {
  bookingDistribution: null,
  isChange: false,
  isLoading: false,
  loadingBooking: false,
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
  async ({ params, minusBalance }) => {
    try {
      const res = await bookingDistributionApi.create(params);
      return { data: res.data, minusBalance };
    } catch (error) {
      console.log(error);
    }
  }
);

export const cancelBookingDistribution = createAsyncThunk(
  "booking_distribution/cancel",
  async (id, { rejectWithValue }) => {
    try {
      const res = await bookingDistributionApi.cancel(id);
      // return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
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
    builder.addCase(createBookingDistribution.pending, (state, action) => {
      return { ...state, loadingBooking: true };
    });
    builder.addCase(createBookingDistribution.fulfilled, (state, action) => {
      const { bookingDistribution } = state;
      toast.success("Tạo đăng ký bán thành công");
      const newBooking = action.payload.data;
      console.log("new booking distribute: ", newBooking);
      const newBookingList = [...bookingDistribution, newBooking];

      return {
        ...state,
        loadingBooking: false,
        bookingDistribution: newBookingList,
      };
    });
    builder.addCase(createBookingDistribution.rejected, (state, action) => {
      toast.error("Tạo đăng ký bán thất bại");

      return { ...state, loadingBooking: false };
    });
    builder.addCase(cancelBookingDistribution.pending, (state, action) => {
      return { ...state, loadingBooking: true };
    });
    builder.addCase(cancelBookingDistribution.fulfilled, (state, action) => {
      const { bookingDistribution } = state;
      const bookingId = action.meta.arg;
      const newBookingList = bookingDistribution.filter(
        (item) => item.id !== bookingId
      );
      toast.success(
        "Bạn đã huỷ bán hộ thành công. Số tiền của bạn sẽ được chuyển về ví của investor "
      );
      return {
        ...state,
        bookingDistribution: newBookingList,
        loadingBooking: false,
      };
    });
    builder.addCase(cancelBookingDistribution.rejected, (state, action) => {
      toast.error("Còn subscription bên trong dự án, không thể huỷ");
      return { ...state, loadingBooking: false };
    });
  },
});

export const { setIsChange } = bookingDistributionSlice.actions;

export default bookingDistributionSlice.reducer;
