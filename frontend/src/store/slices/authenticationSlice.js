import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const AuthenticationSlice = createSlice({
  initialState,
  name: "authentication",
  reducers: {
    login(state, action) {},
    register(state, action) {},
  },
});

export const { login, register } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
