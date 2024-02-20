import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: null,
  isLoading: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(getAllApartment.pending, (state, action) => {
    //   return { ...state, apartments: action.payload, isLoading: true };
    // });
    // builder.addCase(getAllApartment.fulfilled, (state, action) => {
    //   return { ...state, apartments: action.payload, isLoading: false };
    // });
    // builder.addCase(getApartmentById.pending, (state, action) => {
    //   return { ...state, apartmentDetail: action.payload, isLoading: true };
    // });
    // builder.addCase(getApartmentById.fulfilled, (state, action) => {
    //   return { ...state, apartmentDetail: action.payload, isLoading: false };
    // });
  },
});

export const {} = projectSlice.actions;

export default projectSlice.reducer;
