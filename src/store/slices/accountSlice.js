import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import accountApi from "../../api/accountApi";
import { apartmentApi } from "../../api/apartmentApi";
import { toast } from "react-toastify";

export const getAccountDetail = createAsyncThunk(
  "account/get_detail",
  async (id) => {
    try {
      const res = await accountApi.getAccountDetail(id);
      return res.data;
    } catch (error) {
      console.log(error);
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

const initialState = {
  currentUser: null,
  isLogin: false,
  notification: null,
  role: "",
  id: null,
  loading: false,
  loadingButton: false,
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
    setAgency: (state, action) => {
      return { ...state, agency: action.payload };
    },
    setInvestor: (state, action) => {
      return { ...state, investor: action.payload };
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
    builder.addCase(getAgencyId.fulfilled, (state, action) => {
      return { ...state, agency: action.payload };
    });
    builder.addCase(getAccountDetail.fulfilled, (state, action) => {
      return { ...state, currentUser: action.payload };
    });
    builder.addCase(getAllAccount.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getAllAccount.fulfilled, (state, action) => {
      return { ...state, accountForAdmin: action.payload, loading: false };
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
      console.log("new account:", newAccountForAdmin);
      toast.success("Đổi trạng thái thành công!!!");
      return {
        ...state,
        accountForAdmin: newAccountForAdmin,
        loadingButton: false,
      };
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
} = accountSlice.actions;

export default accountSlice.reducer;
