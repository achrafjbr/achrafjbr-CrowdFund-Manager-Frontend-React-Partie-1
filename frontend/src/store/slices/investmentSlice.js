import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInvestmentApi } from "../../services/invstementService";
import { getMeAPI } from "../../services/walletService";

export const fetchInvestment = createAsyncThunk(
  "Investment/getInvestmentApi",
  async (_, thunkApi) => {
    try {
      return await getInvestmentApi();
      
    } catch (error) {
        return thunkApi.rejectWithValue(
            error.response?.data?.message || "Failed to fetch Investment",
        );
    }
},
);
export const getInvestorBalance = createAsyncThunk(
  "wallet/getInvestorBalance",
  async (_,apiThunk) => {
    try {
      const response = await getMeAPI();
      return response;
    } catch (error) {
      return apiThunk.rejectWithValue(error.message);
    }
  },
);

const investmentSlice = createSlice({
  name: "investment",
  initialState: {
    investment: [],
    investor: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvestment.fulfilled, (state, action) => {
        state.loading = false;
        state.investment = action.payload;
      })
      .addCase(fetchInvestment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    //   balance
      .addCase(getInvestorBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInvestorBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.investor = action.payload;
      })
      .addCase(getInvestorBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default investmentSlice.reducer;
