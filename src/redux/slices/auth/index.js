import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value : ""
}

export const authSlice = createSlice({
    name : "Auth",
    initialState,
    reducers: {
        setJWTToken : (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setJWTToken } = authSlice.actions
export default authSlice.reducer