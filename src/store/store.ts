import { configureStore } from "@reduxjs/toolkit";
import { apiUserSlice } from "../api/apiUserSlice";

export const store = configureStore({
  reducer: {
    [apiUserSlice.reducerPath]: apiUserSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiUserSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
