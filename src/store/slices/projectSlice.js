import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { projectApi } from "../../api/projectApi";
import { toast } from "react-toastify";

export const getAllProjectByInvesId = createAsyncThunk(
  "project/get_all_project",
  async (id, { rejectWithValue }) => {
    try {
      const res = await projectApi.getAll(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
      return res.data;
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
      return res.data;
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
  loadingModal: false,
  loadingChange: false,
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
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(getAllProjectByInvesId.fulfilled, (state, action) => {
      return {
        ...state,
        projects: action.payload,
        loadingChange: false,
        isLoading: false,
      };
    });
    builder.addCase(getAllProjectByInvesId.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    });
    builder.addCase(getProjectById.pending, (state, action) => {
      return { ...state, loadingModal: true };
    });
    builder.addCase(getProjectById.fulfilled, (state, action) => {
      return { ...state, projectDetail: action.payload, loadingModal: false };
    });
    builder.addCase(deleteProject.pending, (state, action) => {
      return { ...state, loadingChange: true };
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      const { projects } = state;
      const deletedProjectId = action.meta.arg; // Accessing id passed as argument
      console.log(deletedProjectId);
      const newProjects = projects.filter(
        (item) => item.id !== deletedProjectId
      );

      toast.success("Xoá dự án thành công");
      return { ...state, projects: newProjects, loadingChange: false };
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      toast.error("Không thể xoá dự án còn hoạt động");

      return { ...state, loadingChange: false };
    });
    builder.addCase(createProject.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      const { projects } = state;

      const newProject = action.payload;
      const newProjects = [...projects, newProject];

      toast.success("Tạo dự án thành công");

      return {
        ...state,
        isLoading: false,
        projects: newProjects,
        // isChange: true,
      };
    });
    builder.addCase(createProject.rejected, (state, action) => {
      toast.error("Tạo dự án thất bại");

      return { ...state, isLoading: false };
    });
    builder.addCase(updateProject.pending, (state, action) => {
      return { ...state, loadingChange: true };
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      const { projects } = state;
      const editId = action.payload.id;
      const newProjects = projects.map((project) => {
        if (project.id === editId) {
          return {
            ...project,
            name: action.meta.arg.params.name,
            startDate: action.meta.arg.params.startDate,
            endDate: action.meta.arg.params.endDate,
            status: action.meta.arg.params.status,
            image: action.meta.arg.params.image,
          };
        }
        return project;
      });
      console.log("new project:", newProjects);
      toast.success("Cập nhật dự án thành công");
      return { ...state, loadingChange: false, projects: newProjects };
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      toast.error("Cập nhật dự án thất bại");
      console.log(action.payload);
      return { ...state, isLoading: false, loadingChange: false };
    });
  },
});

export const { setIsChange, setProjectDetail } = projectSlice.actions;

export default projectSlice.reducer;
