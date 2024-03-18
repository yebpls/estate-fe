import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import accountApi from "../../api/accountApi";
import { apartmentApi } from "../../api/apartmentApi";
import { toast } from "react-toastify";
import { createBookingDistribution } from "./bookingDistributionSlice";

export const getAccountDetail = createAsyncThunk(
  "account/get_detail",
  async (id, { rejectWithValue }) => {
    try {
      const res = await accountApi.getAccountDetail(id);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

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

export const getAllCustomer = createAsyncThunk("customer/get_all", async () => {
  try {
    const res = await accountApi.getAllCus();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getCustomerId = createAsyncThunk("customer/get_id", async (id) => {
  try {
    const res = await accountApi.getCustomerId(id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getAgencyByApartmentId = createAsyncThunk(
  "apartment/getAgency",
  async (id) => {
    try {
      const res = await accountApi.getAgencyByApartment(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllAccount = createAsyncThunk("account/get_all", async () => {
  try {
    const res = await accountApi.getAllAccount();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const changeAccountStatus = createAsyncThunk(
  "account/change_status",
  async (id) => {
    try {
      const res = await accountApi.changeAccoutStatus(id);
    } catch (error) {
      console.log(error);
    }
  }
);

export const payment = createAsyncThunk(
  "payment/payment",
  async ({ id, amount }) => {
    try {
      const res = await accountApi.payment(id, amount);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllTransactions = createAsyncThunk(
  "transaction/get_all",
  async () => {
    try {
      const res = await accountApi.getAllTransaction();
      return res.data;
    } catch (error) {
      console.log(error);
      // return rejectWithValue(error.response);
    }
  }
);

export const changeAccountDetail = createAsyncThunk(
  "account/update_info",
  async ({ id, params }) => {
    try {
      const res = await accountApi.updateAccountDetail(id, params);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  currentUser: null,
  cusList: null,
  isLogin: false,
  notification: null,
  role: "",
  balance: 0,
  id: null,
  loading: false,
  loadingButton: false,
  error: null,
  success: false,
  investor: null,
  customer: null,
  agency: null,
  agencyByApartment: null,
  transaction: null,
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
    setAgency: (state, action) => {
      return { ...state, agency: action.payload };
    },
    setInvestor: (state, action) => {
      return { ...state, investor: action.payload };
    },
    setCustomer: (state, action) => {
      return { ...state, customer: action.payload };
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInvestorId.fulfilled, (state, action) => {
      return { ...state, investor: action.payload };
    });
    builder.addCase(getAllCustomer.fulfilled, (state, action) => {
      return { ...state, cusList: action.payload };
    });
    builder.addCase(getCustomerId.fulfilled, (state, action) => {
      return { ...state, customer: action.payload };
    });
    builder.addCase(getAgencyId.fulfilled, (state, action) => {
      return { ...state, agency: action.payload };
    });
    builder.addCase(getAgencyByApartmentId.fulfilled, (state, action) => {
      return { ...state, agencyByApartment: action.payload };
    });
    builder.addCase(getAccountDetail.fulfilled, (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
        balance: action.payload?.balance,
      };
    });
    builder.addCase(getAccountDetail.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(changeAccountDetail.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(changeAccountDetail.fulfilled, (state, action) => {
      toast.success("Cập nhật thông tin thành công");
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    });
    builder.addCase(changeAccountDetail.rejected, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(getAllAccount.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getAllAccount.fulfilled, (state, action) => {
      const accountForAdmin = action.payload.filter(
        (account) => account.role != "ADMIN"
      );
      return { ...state, accountForAdmin, loading: false };
    });
    builder.addCase(changeAccountStatus.pending, (state, action) => {
      return { ...state, loadingButton: true };
    });
    builder.addCase(changeAccountStatus.fulfilled, (state, action) => {
      const { accountForAdmin } = state;
      const accountChangedId = action.meta.arg; // Accessing id passed as argument
      console.log(accountChangedId);
      const newAccountForAdmin = accountForAdmin.map((account) => {
        if (account.id === accountChangedId) {
          return { ...account, status: !account.status };
        }
        return account;
      });
      // console.log("new account:", newAccountForAdmin);
      toast.success("Đổi trạng thái thành công!!!");
      return {
        ...state,
        accountForAdmin: newAccountForAdmin,
        loadingButton: false,
      };
    });
    builder.addCase(payment.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(payment.fulfilled, (state, action) => {
      return {
        ...state,
        balance: state.balance + action.meta.arg.amount,
        loading: false,
      };
    });
    builder.addCase(getAllTransactions.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getAllTransactions.fulfilled, (state, action) => {
      return { ...state, transaction: action.payload, loading: false };
    });
    builder.addCase(getAllTransactions.rejected, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(createBookingDistribution.fulfilled, (state, action) => {
      const { minusBalance, data } = action.payload;
      console.log(minusBalance, data);
      const newBalance = state.balance - minusBalance;
      console.log(newBalance);
      return { ...state, balance: newBalance };
    });
  },
});

export const {
  setRole,
  setIsLogin,
  setUsername,
  setAccId,
  setCurrentUser,
  setAgency,
  setInvestor,
  setCustomer,
} = accountSlice.actions;

export default accountSlice.reducer;
