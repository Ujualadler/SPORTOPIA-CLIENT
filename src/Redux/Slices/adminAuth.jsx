import { createSlice } from "@reduxjs/toolkit";

export const AdminAuth = createSlice({
    name: "admin",
    initialState: {
        Token: null,
    },
    reducers: {
        AdminLogin(state, action) {
            state.Token = action.payload.token;
        },
        AdminLogout(state, action) {
            state.Token = "";
        },
    },
});


export const { AdminLogin,AdminLogout} = AdminAuth.actions;
export const AdminReducer= AdminAuth.reducer;