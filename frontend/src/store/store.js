import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "../store/slices/authenticationSlice";
import InvestorsSlice from "../store/slices/investorsSlice.js";
export const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice,
    investors: InvestorsSlice,
  },
});
export default store;
