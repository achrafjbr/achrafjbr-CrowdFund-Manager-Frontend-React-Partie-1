import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInvestorsApi } from "../../services/investorsService";

export const getInvestors = createAsyncThunk(
  "investors/getInvestor",
  async (thunkApi) => {
    try {
      const response = await getInvestorsApi();
      console.log("Data", response.data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  isLoading: false,
  isError: null,
  investors: [],
};

const InvestorsSlice = createSlice({
  initialState,
  name: "investors",
  extraReducers: (builder) =>
    builder
      .addCase(getInvestors.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getInvestors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.investors = action.payload;
      })
      .addCase(getInvestors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
      }),
});

export default InvestorsSlice.reducer;
