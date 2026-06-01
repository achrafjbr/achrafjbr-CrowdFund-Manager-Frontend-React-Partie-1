import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "../store/slices/authenticationSlice";
import InvestorsSlice from "../store/slices/investorsSlice.js";
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice,
    investors: InvestorsSlice,
    projects: projectReducer,
  },
});
export default store;
