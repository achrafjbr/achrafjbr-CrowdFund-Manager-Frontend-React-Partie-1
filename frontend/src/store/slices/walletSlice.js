import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addBalanceAPI,
  getMeAPI,
  myInvestisemetAPI,
} from "../../services/walletService";
// import { getInvestorsApi } from "../../services/investorsService";

export const addBalance = createAsyncThunk(
  "wallet/addBalance",
  async (amount, apiThunk) => {
    try {
      const response = await addBalanceAPI(amount);
      return response;
    } catch (error) {
      return apiThunk.rejectWithValue(error.message);
    }
  },
);

export const getInvestorBalance = createAsyncThunk(
  "wallet/getInvestorBalance",
  async (apiThunk) => {
    try {
      const response = await getMeAPI();
      return response;
    } catch (error) {
      return apiThunk.rejectWithValue(error.message);
    }
  },
);

export const investisemetOfInvestor = createAsyncThunk(
  "wallet/investisemetOfInvestor",
  async (apiThunk) => {
    try {
      const response = await myInvestisemetAPI();

      console.log("investisemetOfInvestor response", response);
      return response;
    } catch (error) {
      return apiThunk.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  isLoading: false,
  isError: null,
  investements: [],
  investor: {},
};

const WalletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Investement
      .addCase(investisemetOfInvestor.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(investisemetOfInvestor.fulfilled, (state, action) => {
        state.investements = action.payload;
        state.isLoading = false;
      })
      .addCase(investisemetOfInvestor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // investor & balance
      .addCase(getInvestorBalance.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getInvestorBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.investor = action.payload;
      })
      .addCase(getInvestorBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // Adding balance.
      .addCase(addBalance.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addBalance.fulfilled, (state, action) => {
        state.investor.balance = action.payload.balance;
        state.isLoading = false;
      })
      .addCase(addBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default WalletSlice.reducer;
