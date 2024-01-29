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

const initialState = {
  apartments: null,
};

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllApartment.fulfilled, (state, action) => {
      return { ...state, apartments: action.payload };
    });
  },
});

export const {} = apartmentSlice.actions;

export default apartmentSlice.reducer;
