import { configureStore } from "@reduxjs/toolkit";
import { portfolioApi } from "@/redux/api/portfolioApi";
import authReducer from "@/redux/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [portfolioApi.reducerPath]: portfolioApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(portfolioApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
