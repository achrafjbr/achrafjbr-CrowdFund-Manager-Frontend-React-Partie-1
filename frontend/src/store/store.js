import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "../store/slices/authenticationSlice";
import InvestorsSlice from "../store/slices/investorsSlice.js";
import projectReducer from "./slices/projectSlice";
import walletReducer from "./slices/walletSlice";
import investmentSlice from "./slices/investmentSlice.js"
import ownerSlice from "./slices/ownerSlice.js"
export const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice,
    investors: InvestorsSlice,
    projects: projectReducer,
    wallet: walletReducer,
    investment : investmentSlice,
    owners : ownerSlice
  },
}
);
export default store;
