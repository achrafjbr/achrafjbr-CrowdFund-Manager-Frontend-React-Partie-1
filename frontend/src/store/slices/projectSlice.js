import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProjects,
  getProjectById,
  updateProject as updateProjectAPI,
  deleteProject,
} from "../../services/projectService";

const initialState = {
  projects: [],
  selectedProject: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, thunkAPI) => {
    try {
      return await getProjects();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id, thunkAPI) => {
    try {
      return await getProjectById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, projectData }, thunkAPI) => {
    try {
      return await updateProjectAPI(id, projectData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteProjectThunk = createAsyncThunk(
  "projects/deleteProject",
  async (id, thunkAPI) => {
    try {
      await deleteProject(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProject.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.updateLoading = false;

        const index = state.projects.findIndex(
          (project) => project._id === action.payload._id
        );

        if (index !== -1) {
          state.projects[index] = action.payload;
        }

        if (state.selectedProject?._id === action.payload._id) {
          state.selectedProject = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      .addCase(deleteProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProjectThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.projects = state.projects.filter(
          (project) => project._id !== action.payload
        );
      })
      .addCase(deleteProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = projectSlice.actions;

export default projectSlice.reducer;