import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import accountApi from "../../api/accountApi";

export const getInvestorId = createAsyncThunk("investor/get_id", async (id) => {
  try {
    const res = await accountApi.getInvestorId(id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getAgencyId = createAsyncThunk("agency/get_id", async (id) => {
  try {
    const res = await accountApi.getAgencyId(id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  currentUser: null,
  isLogin: false,
  notification: null,
  role: "",
  id: null,
  loading: false,
  error: null,
  success: false,
  investor: null,
  agency: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setRole: (state, action) => {
      return { ...state, role: action.payload };
    },
    setIsLogin: (state, action) => {
      return { ...state, isLogin: action.payload };
    },
    setAccId: (state, action) => {
      return { ...state, id: action.payload };
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInvestorId.fulfilled, (state, action) => {
      return { ...state, investor: action.payload };
    });
  },
});

export const { setRole, setIsLogin, setUsername, setAccId } =
  accountSlice.actions;

export default accountSlice.reducer;
