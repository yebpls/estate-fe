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
  },
});

export default contractSlice.reducer;
