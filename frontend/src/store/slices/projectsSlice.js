import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../services/tokenService";
const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  //    type action
  "project/fetchProjects",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/projects/my-projects",
        {
            headers :{
                Authorization : `Bearer ${getToken()}`
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
