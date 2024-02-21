import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { projectApi } from "../../api/projectApi";
import { toast } from "react-toastify";

export const getAllProjectByInvesId = createAsyncThunk(
  "project/get_all_project",
  async (id, { rejectWithValue }) => {
    try {
      const res = await projectApi.getAll(id);
      return res.data;
    } catch (error) {}
  }
);
export const getProjectById = createAsyncThunk(
  "project/get_by_id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await projectApi.getById(id);
      return res.data;
    } catch (error) {}
  }
);
export const deleteProject = createAsyncThunk(
  "project/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await projectApi.delete(id);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const createProject = createAsyncThunk(
  "project/create",
  async (params, { rejectWithValue }) => {
    try {
      const res = await projectApi.create(params);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateProject = createAsyncThunk(
  "project/update",
  async ({ params, id }, { rejectWithValue }) => {
    try {
      const res = await projectApi.update(params, id);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  projects: null,
  projectDetail: null,
  isLoading: false,
  isChange: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setIsChange: (state, action) => {
      return { ...state, isChange: !state.isChange };
    },
    setProjectDetail: (state, action) => {
      return { ...state, projectDetail: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProjectByInvesId.pending, (state, action) => {
      return { ...state, projects: action.payload, isLoading: true };
    });
    builder.addCase(getAllProjectByInvesId.fulfilled, (state, action) => {
      return { ...state, projects: action.payload, isLoading: false };
    });
    builder.addCase(getProjectById.fulfilled, (state, action) => {
      return { ...state, projectDetail: action.payload, isLoading: false };
    });
    builder.addCase(deleteProject.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      const { projects } = state;
      const deletedProjectId = action.meta.arg; // Accessing id passed as argument
      console.log(deletedProjectId);
      const newProjects = projects.filter(
        (item) => item.id !== deletedProjectId
      );

      toast.success("Xoá dự án thành công");
      return { ...state, projects: newProjects, isLoading: false };
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      toast.error("Không thể xoá dự án còn nhiều căn hộ");

      return { ...state, isLoading: false };
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      toast.success("Tạo dự án thành công");

      return { ...state, isLoading: false, isChange: true };
    });
    builder.addCase(createProject.rejected, (state, action) => {
      toast.error("Tạo dự án thất bại");

      return { ...state, isLoading: false };
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      toast.success("Cập nhật dự án thành công");

      return { ...state, isLoading: false, isChange: true };
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      toast.error("Cập nhật dự án thất bại");
      console.log(action.payload);
      return { ...state, isLoading: false };
    });
  },
});

export const { setIsChange, setProjectDetail } = projectSlice.actions;

export default projectSlice.reducer;
