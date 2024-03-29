import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { subcriptionApi } from "../../api/subcriptionApi";
import { toast } from "react-toastify";

export const createSubcription = createAsyncThunk(
  "subcription/create",
  async (params, { rejectWithValue }) => {
    try {
      const res = await subcriptionApi.createSubcription(params);
      console.log('param:', params);
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

export const updateStatusBySubcriptionId = createAsyncThunk(
  "subcription/update_status",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      await subcriptionApi.updateSubcriptionStatus(id, status);
      console.log("slice: ", id, status);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSubcriptionByCustomerId = createAsyncThunk(
  "subcription/get_by_customer",
  async (id, { rejectWithValue, getState }) => {
    try {
      const res = await subcriptionApi.getSubcriptionByCusId(id);
      const apartments = getState().apartmentReducer.apartments;
      const buildings = getState().buildingReducer.buildings;
      return { data: res.data, apartments, buildings };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  subcription: null,
  loadingSubcription: false,
  loadingSubNofi: false,
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
    builder.addCase(updateStatusBySubcriptionId.pending, (state, action) => {
      return { ...state, loadingSubNofi: true };
    });
    builder.addCase(updateStatusBySubcriptionId.fulfilled, (state, action) => {
      if (action.meta.arg.status === 2) {
        toast.success("Hẹn gặp thành công");
      } else if (action.meta.arg.status === 0) {
        toast.success("Đã bán thành công căn hộ");
      }
      const { subcriptionByAppointment } = state;
      const subcriptionChangeId = action.meta.arg.id; // Accessing id passed as argument
      console.log(subcriptionByAppointment, subcriptionByAppointment);
      const newSubcriptionByAppointment = subcriptionByAppointment.map(
        (subcription) => {
          if (subcription.id === subcriptionChangeId) {
            return {
              ...subcription,
              subscriptionStatus: action.meta.arg.status,
            };
          }
          return newSubcriptionByAppointment;
        }
      );
      return {
        ...state,
        loadingSubNofi: false,
        subcriptionByAppointment: newSubcriptionByAppointment,
      };
    });
    builder.addCase(updateStatusBySubcriptionId.rejected, (state, action) => {
      return { ...state, loadingSubNofi: false };
    });
    builder.addCase(getSubcriptionByCustomerId.pending, (state, action) => {
      return { ...state };
    });
    builder.addCase(getSubcriptionByCustomerId.fulfilled, (state, action) => {
      const { data, apartments, buildings } = action.payload;
      const newSubcription = data?.map((subcription) => {
        const matchApartment = apartments?.find(
          (apartments) => apartments.id === subcription.apartmentId
        );
        if (matchApartment) {
          const matchBuilding = buildings?.find(
            (building) => building?.id === matchApartment?.buildingId
          );
          if (matchBuilding) {
            return {
              ...subcription,
              projectName: matchApartment?.projectName,
              address: matchBuilding?.address,
              buildingName: matchBuilding?.buildingName,
              apartmentNumber: matchApartment?.apartmentNumber,
              mainImage: matchApartment?.mainImage,
              price: matchApartment?.price,
              area: matchApartment?.area,
            };
          }
        }
        return subcription;
      });
      console.log(data, apartments, newSubcription, buildings); // Now you can access the apartments data directly
      return { ...state, subcriptionByCus: newSubcription };
    });
  },
});

export default subcriptionSlice.reducer;
