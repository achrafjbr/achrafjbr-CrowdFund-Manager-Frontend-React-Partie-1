import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import {getInvestorsApi} from "../../services/investorsService"
export const fetchInvestors = createAsyncThunk(
  "investors/fetchInvestors",
  async (data,thunkApi) =>{
     try {
      return await getInvestorsApi()
     } catch (error) {
        return thunkApi.rejectWithValue(
          error.response?.data?.message || "Failed to fetch investors"
        )
     }
  }
)

 const investorSlice = createSlice({
  name :"investors",
  initialState :{
    investors : [],
    loding :false,
    error : null ,
  },
  reducers :{},
  extraReducers :(builder) =>{
    builder
    .addCase(fetchInvestors.pending , (state) =>{
      state.loding = true;
      state.error=null;
    })
    .addCase(fetchInvestors.fulfilled, (state ,action) =>{
      state.loding =false ;
      state.investors = action.payload;
    })
    .addCase(fetchInvestors.rejected, (state ,action) => {
      state.loding =false
      state.error =action.payload
    })
  }
})
export default investorSlice.reducer