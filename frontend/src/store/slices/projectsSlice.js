import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  data: [],
  loading: false,
  error: null,
};
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBjOGQzM2NkYzZlMzUwMjJhZTMxMzEiLCJyb2xlIjoib3duZXIiLCJpYXQiOjE3NzkzNzU3MzQsImV4cCI6MTc4MDIzOTczNH0.SBiX8PbooLB5C1Ru59th8wLujKji9hTxUyEMGsjyiuo"
export const fetchProjects = createAsyncThunk(
  //    type action
  "project/fetchProjects",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/projects/my-projects",
        {
            headers :{
                Authorization : `Bearer ${token}`
            }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error  fetching data:", error);
    }
  },
);
const projectsSlice = createSlice({
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
        state.data = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default projectsSlice.reducer;
