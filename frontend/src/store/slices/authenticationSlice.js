import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  loginUserApi,
  registerUserApi,
} from "../../services/authenticationService";
import {
  decodeToken,
  deleteToken,
  getToken,
  setToken,
} from "../../services/tokenService";

// LOGIN API CALL (async thunk)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, thunkAPI) => {
    try {
      const response = await loginUserApi(userCredentials);
      return response;
      // expected: { token, user }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    console.log(userData);
    try {
      const response = await registerUserApi(userData);
      console.log("Response in thunk", response);

      return response;
    } catch (err) {
      console.log("Error thunk", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const initialState = {
  isLoading: false,
  isError: null,
  token: getToken() || null,
  user: null,
  decodedToken: decodeToken(),
};

const AuthenticationSlice = createSlice({
  initialState,
  name: "authentication",
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      deleteToken();
    },
    hideError: (state, action) => {
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        setToken(action.payload.token);
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { logout, hideError } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
