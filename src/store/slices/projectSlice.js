import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { projectApi } from "../../api/projectApi";

export const getAllProjectByInvesId = createAsyncThunk(
  "investor/get_all_project",
  async (id) => {
    try {
      const res = await projectApi.getAll(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  projects: null,
  isLoading: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjectByInvesId.pending, (state, action) => {
      return { ...state, projects: action.payload, isLoading: true };
    });
    builder.addCase(getAllProjectByInvesId.fulfilled, (state, action) => {
      return { ...state, projects: action.payload, isLoading: false };
    });
    // builder.addCase(getApartmentById.pending, (state, action) => {
    //   return { ...state, apartmentDetail: action.payload, isLoading: true };
    // });
    // builder.addCase(getApartmentById.fulfilled, (state, action) => {
    //   return { ...state, apartmentDetail: action.payload, isLoading: false };
    // });
  },
});

export const {} = projectSlice.actions;

export default projectSlice.reducer;
