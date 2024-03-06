import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { subcriptionApi } from "../../api/subcriptionApi";
import { toast } from "react-toastify";

export const createSubcription = createAsyncThunk(
  "subcription/create",
  async (params, { rejectWithValue }) => {
    try {
      const res = await subcriptionApi.createSubcription(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSubcriptionByAppointmentId = createAsyncThunk(
  "subcription/get_by_appointmentId",
  async (id, { rejectWithValue }) => {
    try {
      const res = await subcriptionApi.getByAppointmentId(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  subcription: null,
  loadingSubcription: false,
};

const subcriptionSlice = createSlice({
  name: "subcription",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(createSubcription.pending, (state, action) => {
      return { ...state, loadingSubcription: true };
    });
    builder.addCase(createSubcription.fulfilled, (state, action) => {
      toast.success("Đăng ký xem nhà thành công");
      return { ...state, loadingSubcription: false };
    });
    builder.addCase(createSubcription.rejected, (state, action) => {
      toast.error("Đăng ký không thành công, vui lòng thử lại");
      return { ...state, loadingSubcription: false };
    });
    builder.addCase(getSubcriptionByAppointmentId.pending, (state, action) => {
      return { ...state, loadingSubcription: true };
    });
    builder.addCase(
      getSubcriptionByAppointmentId.fulfilled,
      (state, action) => {
        return {
          ...state,
          subcriptionByAppointment: action.payload,
          loadingSubcription: false,
        };
      }
    );
    builder.addCase(getSubcriptionByAppointmentId.rejected, (state, action) => {
      return {
        ...state,
        subcriptionByAppointment: null,
        loadingSubcription: false,
      };
    });
  },
});

export default subcriptionSlice.reducer;
