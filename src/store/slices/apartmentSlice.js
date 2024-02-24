import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apartmentApi } from "../../api/apartmentApi";
import { toast } from "react-toastify";

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

export const getAllAvailableApartment = createAsyncThunk(
  "apartment/get_all_available",
  async () => {
    try {
      const res = await apartmentApi.getAllAvailable();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getApartmentById = createAsyncThunk(
  "apartment/get_by_id",
  async (id) => {
    try {
      const res = await apartmentApi.getById(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllApartmentByProjectId = createAsyncThunk(
  "apartment/get_all_by_projectid",
  async (id) => {
    try {
      const res = await apartmentApi.getAllByProjectId(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createApartment = createAsyncThunk(
  "apartment/create",
  async (params, { rejectWithValue }) => {
    try {
      const res = await apartmentApi.create(params);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteApartment = createAsyncThunk(
  "apartment/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apartmentApi.delete(id);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateApartment = createAsyncThunk(
  "apartment/update",
  async ({ params, id }, { rejectWithValue }) => {
    try {
      const res = await apartmentApi.update(id, params);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  apartments: null,
  availableApartment: null,
  apartmentByProject: null,
  apartmentDetail: null,
  isLoading: false,
  isChange: false,
};

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    setIsChange: (state, action) => {
      return { ...state, isChange: !state.isChange };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllApartment.pending, (state, action) => {
      return { ...state, apartments: action.payload, isLoading: true };
    });
    builder.addCase(getAllApartment.fulfilled, (state, action) => {
      return { ...state, apartments: action.payload, isLoading: false };
    });
    builder.addCase(getAllAvailableApartment.pending, (state, action) => {
      return { ...state, availableApartment: action.payload, isLoading: true };
    });
    builder.addCase(getAllAvailableApartment.fulfilled, (state, action) => {
      return { ...state, availableApartment: action.payload, isLoading: false };
    });
    builder.addCase(getApartmentById.pending, (state, action) => {
      return { ...state, apartmentDetail: action.payload, isLoading: true };
    });
    builder.addCase(getApartmentById.fulfilled, (state, action) => {
      return { ...state, apartmentDetail: action.payload, isLoading: false };
    });
    builder.addCase(getAllApartmentByProjectId.pending, (state, action) => {
      return { ...state, apartmentByProject: action.payload, isLoading: true };
    });
    builder.addCase(getAllApartmentByProjectId.fulfilled, (state, action) => {
      return { ...state, apartmentByProject: action.payload, isLoading: false };
    });
    builder.addCase(createApartment.fulfilled, (state, action) => {
      toast.success("Tạo căn hộ thành công");

      return { ...state, isLoading: false, isChange: true };
    });
    builder.addCase(createApartment.rejected, (state, action) => {
      toast.error("Tạo căn hộ thất bại");

      return { ...state, isLoading: false };
    });
    builder.addCase(deleteApartment.fulfilled, (state, action) => {
      const { apartmentByProject } = state;
      const deletedApartmentId = action.meta.arg; // Accessing id passed as argument
      console.log(deletedApartmentId);
      const newApartments = apartmentByProject.filter(
        (item) => item.id !== deletedApartmentId
      );

      toast.success("Xoá căn hộ thành công");
      return { ...state, apartmentByProject: newApartments, isLoading: false };
    });
    builder.addCase(deleteApartment.rejected, (state, action) => {
      toast.error("Không thể xoá căn hộ");

      return { ...state, isLoading: false };
    });
    builder.addCase(updateApartment.fulfilled, (state, action) => {
      toast.success("Cập nhật căn hộ thành công");

      return { ...state, isLoading: false, isChange: true };
    });
    builder.addCase(updateApartment.rejected, (state, action) => {
      toast.error("Cập nhật căn hộ thất bại");
      console.log(action.payload);
      return { ...state, isLoading: false };
    });
  },
});

export const { setIsChange } = apartmentSlice.actions;

export default apartmentSlice.reducer;
