import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import accountApi from "../../api/accountApi";

const initialState = {
  isLoading: false,
  paymentUri: null,
};

export const createPayment = createAsyncThunk(
  "account/create-payment",
  async (amount) => {
    try {
      const res = await accountApi.createPayment(amount);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPayment.pending, (state, action) => {});
    builder.addCase(createPayment.fulfilled, (state, action) => {
      window.open(action.payload.url);
      return { ...state, paymentUri: action.payload.url };
    });
  },
});

export const {} = paymentSlice.actions;

export default paymentSlice.reducer;
