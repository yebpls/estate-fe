import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { subcriptionApi } from "../../api/subcriptionApi";
import { toast } from "react-toastify";
import { soldApartment } from "./appointmentSlice";

export const createSubcription = createAsyncThunk(
  "subcription/create",
  async (params, { rejectWithValue }) => {
    try {
      const res = await subcriptionApi.createSubcription(params);
      console.log("param:", params);
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
      }
      if (action.meta.arg.status === 1) {
        toast.error("Đã huỷ cuộc hẹn");
      }
      const { subcriptionByAppointment } = state;
      const subcriptionChangeId = action.meta.arg.id; // Accessing id passed as argument
      const status = action.meta.arg.status;
      const newSubcriptionByAppointment = subcriptionByAppointment?.map(
        (subcription) => {
          if (subcription.id === subcriptionChangeId) {
            return {
              ...subcription,
              subscriptionStatus: status,
            };
          } else {
            if (status === 2) {
              return {
                ...subcription,
                subscriptionStatus: 4,
              };
            }
            if (status === 1) {
              return {
                ...subcription,
                subscriptionStatus: 1,
              };
            }
          }
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
    builder.addCase(soldApartment.pending, (state, action) => {
      return { ...state, loadingSubNofi: true };
    });
    builder.addCase(soldApartment.fulfilled, (state, action) => {
      const { subcriptionByAppointment } = state;
      const subcriptionChangeId = action.meta.arg.subId; // Accessing id passed as argument
      const newSubcriptionByAppointment = subcriptionByAppointment?.map(
        (subcription) => {
          if (subcription.id === subcriptionChangeId) {
            return {
              ...subcription,
              subscriptionStatus: 0,
            };
          }
          return subcription;
        }
      );
      return {
        ...state,
        loadingSubNofi: false,
        subcriptionByAppointment: newSubcriptionByAppointment,
      };
    });
    builder.addCase(soldApartment.rejected, (state, action) => {
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
      return { ...state, subcriptionByCus: newSubcription };
    });
    builder.addCase(getSubcriptionByCustomerId.rejected, (state, action) => {
      return { ...state, subcriptionByCus: null };
    });
  },
});

export default subcriptionSlice.reducer;
