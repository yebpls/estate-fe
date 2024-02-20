import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apartmentApi } from "../../api/apartmentApi";

export const getAllApartment = createAsyncThunk(
  "apartment/get_all",
  async () => {
    try {
      const res = await apartmentApi.getAll();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getApartmentById = createAsyncThunk(
  "apartment/get_by_id",
  async (id) => {
    try {
      const res = await apartmentApi.getById(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  apartments: null,
  apartmentDetail: null,
  isLoading: false,
};

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllApartment.pending, (state, action) => {
      return { ...state, apartments: action.payload, isLoading: true };
    });
    builder.addCase(getAllApartment.fulfilled, (state, action) => {
      return { ...state, apartments: action.payload, isLoading: false };
    });
    builder.addCase(getApartmentById.pending, (state, action) => {
      return { ...state, apartmentDetail: action.payload, isLoading: true };
    });
    builder.addCase(getApartmentById.fulfilled, (state, action) => {
      return { ...state, apartmentDetail: action.payload, isLoading: false };
    });
  },
});

export const {} = apartmentSlice.actions;

export default apartmentSlice.reducer;
