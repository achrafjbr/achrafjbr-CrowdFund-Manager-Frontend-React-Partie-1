import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "../store/slices/authenticationSlice";
export const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice,
  },
});
export default store;
