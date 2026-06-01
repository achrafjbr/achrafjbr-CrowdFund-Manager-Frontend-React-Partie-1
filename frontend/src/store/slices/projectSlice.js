import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProjects,
  getProjectById,
  updateProject as updateProjectAPI,
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
        error.response?.data?.message || error.message,
      );
    }
  },
);
export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id, thunkAPI) => {
    try {
      return await getProjectById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
// Update project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, projectData }, thunkAPI) => {
    try {
      return await updateProjectAPI(id, projectData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const projectSlice = createSlice({
  name: "projects",
  initialState,

  // Reducers pour les actions synchrones
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // fetch projects
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
      // fetch project by id
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
      // Update project
      .addCase(updateProject.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.updateLoading = false;
        // Mettre à jour dans la liste des projets
        const index = state.projects.findIndex(
          (project) => project._id === action.payload._id,
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        // Mettre à jour le projet sélectionné
        if (state.selectedProject?._id === action.payload._id) {
          state.selectedProject = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});
export const { clearError } = projectSlice.actions;
export default projectSlice.reducer;
