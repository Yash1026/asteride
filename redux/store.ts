import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HomeSlice } from "./slice/homeSlice";

const combinedReducer = combineReducers({
  home: HomeSlice.reducer,
});

export const store = configureStore({
  reducer: combinedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
