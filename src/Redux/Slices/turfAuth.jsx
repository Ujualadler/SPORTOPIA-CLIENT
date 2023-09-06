import { createSlice } from "@reduxjs/toolkit";

export const TurfAuth = createSlice({
    name: "Client",
    initialState: {
        Token: null,
    },
    reducers: {
        TurfLogin(state, action) {
            state.Token = action.payload.token;
        },
        TurfLogout(state, action) {
            state.Token = "";
        },
    },
});


export const { TurfLogin,TurfLogout} = TurfAuth.actions;
export const TurfReducer= TurfAuth.reducer;