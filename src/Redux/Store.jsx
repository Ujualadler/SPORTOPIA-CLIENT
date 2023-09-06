import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage"; 

import { UserReducer } from "./Slices/userAuth"; 
import { TurfReducer } from "./Slices/turfAuth";
import { AdminReducer } from "./Slices/adminAuth";
import { ClubReducer } from "./Slices/clubAuth";

const userPersistConfig = {
    key: 'user',
    storage: storage
}
const turfPersistConfig = {
    key: 'turf',
    storage: storage
}
const adminPersistConfig = {
    key: 'admin',
    storage: storage
}

const clubPersistConfig = {
    key: 'club',
    storage: storage
}

const persistedUserReducer = persistReducer(userPersistConfig, UserReducer)
const persistedTurfReducer = persistReducer(turfPersistConfig, TurfReducer)
const persistedAdminReducer = persistReducer(adminPersistConfig, AdminReducer)
const persistedClubReducer = persistReducer(clubPersistConfig, ClubReducer)

export const Store = configureStore({
    reducer: {
        User: persistedUserReducer,
        Turf: persistedTurfReducer,
        Admin: persistedAdminReducer,
        Club: persistedClubReducer,
    }
})

export const persistor = persistStore(Store)
