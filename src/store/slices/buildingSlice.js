import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cityApi } from "../../api/cityApi";
import { buildingApi } from "../../api/buildingApi";
import { toast } from "react-toastify";

const initialState = {
  buildings: null,
  city: null,
  isLoading: false,
};

export const getAllCity = createAsyncThunk("city/get_all", async () => {
  try {
    const res = await cityApi.getAll();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getAllBuilding = createAsyncThunk("building/get_all", async () => {
  try {
    const res = await buildingApi.getAll();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const createBuilding = createAsyncThunk(
  "building/create",
  async (params) => {
    try {
      const res = await buildingApi.createBuilding(params);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllByProjectId = createAsyncThunk(
  "building/get_all_by_project",
  async (id) => {
    try {
      const res = await buildingApi.getAllByProject(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const buildingSlice = createSlice({
  name: "building",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllByProjectId.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getAllByProjectId.fulfilled, (state, action) => {
      return { ...state, buildings: action.payload, isLoading: false };
    });
    builder.addCase(getAllBuilding.fulfilled, (state, action) => {
      return { ...state, buildings: action.payload };
    });
    builder.addCase(getAllCity.fulfilled, (state, action) => {
      return { ...state, city: action.payload, isLoading: false };
    });
    builder.addCase(createBuilding.pending, (state, action) => {
      return { ...state, loadingChange: true };
    });
    builder.addCase(createBuilding.fulfilled, (state, action) => {
      console.log(action.payload);

      toast.success("Thêm tòa nhà thành công");
      return { ...state, loadingChange: false };
    });
  },
});

export const {} = buildingSlice.actions;

export default buildingSlice.reducer;
