import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loginUserApi } from "../../services/authenticationService";
import { getToken, TOKEN_KEY } from "../../services/tokenService";

// LOGIN API CALL (async thunk)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, thunkAPI) => {
    try {
      const response = loginUserApi(userCredentials);
      return response.data;
      // expected: { token, user }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  isLoading: false,
  isError: null,
  token: getToken(TOKEN_KEY) || null,
  user: null,
};

const AuthenticationSlice = createSlice({
  initialState,
  name: "authentication",
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
