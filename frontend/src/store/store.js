import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "../store/slices/authenticationSlice";
import projectsSlice from "./slices/projectsSlice";
export const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice,
    projects :projectsSlice,
  },
});
export default store;
