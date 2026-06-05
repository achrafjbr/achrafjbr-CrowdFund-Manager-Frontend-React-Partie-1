import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import {getOwnerApi} from "../../services/ownersService"

export const fetchOwner = createAsyncThunk(
    "owners/fetchOwner",
    async (_ ,thunkApi) => {
        try {
            return await getOwnerApi()
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response
            )
        }
    }
)

const ownerSlice = createSlice ({
    name :"owners",
    initialState :{
        owners : [],
        loding : false ,
        error : null,
    },
    reducers :{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchOwner.pending ,state=> {
            state.loding = true;
            state.error = null
        }) 
        .addCase(fetchOwner.fulfilled ,(state ,action) => {
            state.loding = false;
            state.owners =action.payload
        })
        .addCase(fetchOwner.rejected, (state ,action) => {
            state.loding = false
            state.error = action.payload
        })
    }
})
export default ownerSlice.reducer
