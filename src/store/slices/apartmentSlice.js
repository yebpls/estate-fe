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
  "apartment/get_Apartment_By_Id",
  async (id) => {
    try {
      const res = await apartmentApi.getApartmentById(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  apartments: null,
  apartment: null,
};

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllApartment.fulfilled, (state, action) => {
      return { ...state, apartments: action.payload };
    });
    builder.addCase(getApartmentById.fulfilled, (state, action) => {
      return { ...state, apartment: action.payload };
    });
  },
});

export const {} = apartmentSlice.actions;

export default apartmentSlice.reducer;
