import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contractApi } from "../../api/contractApi";

export const getContractByAppointment = createAsyncThunk(
  "contract/get_by_appointment",
  async (id) => {
    try {
      const res = await contractApi.getContractByAppointment(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getContractByApartment = createAsyncThunk(
  "contract/get_by_apartment",
  async (id) => {
    try {
      const res = await contractApi.getContractByApart(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  contractForAgency: null,
  contractForInvestor: null,
};

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContractByAppointment.fulfilled, (state, action) => {
      return { ...state, contractForAgency: action.payload };
    });
    builder.addCase(getContractByApartment.fulfilled, (state, action) => {
      return { ...state, contractForInvestor: action.payload };
    });
  },
});

export default contractSlice.reducer;
