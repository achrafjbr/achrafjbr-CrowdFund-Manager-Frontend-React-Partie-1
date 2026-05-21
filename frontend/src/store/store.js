import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "../store/slices/authenticationSlice";
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice,
    projects: projectReducer,
  },
});
export default store;
