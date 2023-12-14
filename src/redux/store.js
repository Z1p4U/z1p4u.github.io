import { configureStore } from "@reduxjs/toolkit";
import portfolioSlice from "./slices/portfolioSlice";

export const store = configureStore({
  reducer: {
    portfolioSlice: portfolioSlice,
  },
});
