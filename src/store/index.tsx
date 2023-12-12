import { configureStore } from "@reduxjs/toolkit";
import startReducer from "@/containers/start/slice";
import loanReducer from "@/containers/loan/slice";

export const store = configureStore({
  reducer: {
    start: startReducer,
    loan: loanReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
