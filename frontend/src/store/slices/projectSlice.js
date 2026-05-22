import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProjects, getProjectById } from "../../services/projectService";

const initialState = {
  projects: [],
  selectedProject: null,
  loading: false,
  error: null,
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

const projectSlice = createSlice({
  name: "projects",
  initialState,

  reducers: {},

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
      });
  },
});

export default projectSlice.reducer;
