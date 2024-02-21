import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cityApi } from "../../api/cityApi";
import { buildingApi } from "../../api/buildingApi";

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
    builder.addCase(getAllByProjectId.fulfilled, (state, action) => {
      return { ...state, buildings: action.payload };
    });
    builder.addCase(getAllCity.fulfilled, (state, action) => {
      return { ...state, city: action.payload, isLoading: false };
    });
    builder.addCase(createBuilding.fulfilled, (state, action) => {
      console.log(action.payload);
      return { ...state, isLoading: false };
    });
  },
});

export const {} = buildingSlice.actions;

export default buildingSlice.reducer;
