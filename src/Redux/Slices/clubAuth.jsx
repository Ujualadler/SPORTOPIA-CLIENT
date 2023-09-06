import { createSlice } from '@reduxjs/toolkit';

export const ClubAuth = createSlice({
  name: 'club',
  initialState: {
    clubId: null,
    userClubId:null
  },
  reducers: {
    setClubId(state, action){
      state.clubId = action.payload.clubId;
    },
    setUserClubId(state, action){
      state.userClubId = action.payload.userClubId;
    },
  },
});

export const { setClubId,setUserClubId } = ClubAuth.actions;

export const ClubReducer= ClubAuth.reducer;
