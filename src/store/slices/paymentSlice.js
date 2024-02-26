import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = paymentSlice.actions;

export default paymentSlice.reducer;
