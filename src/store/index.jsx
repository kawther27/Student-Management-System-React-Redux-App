import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

import storage from "redux-persist/lib/storage";
import {
    persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

// const store = configureStore({
//     reducer: reducers
// })
const persisConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persisConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

})


// export default store

export default store