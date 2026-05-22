import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideError } from "../store/slices/authenticationSlice";

export const useError = (error) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      const outTimer = setTimeout(() => {
        dispatch(hideError());
      }, 1000);
      () => clearTimeout(outTimer);
    }
  }, [error, dispatch]);
};
