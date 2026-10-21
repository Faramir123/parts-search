import { configureStore } from "@reduxjs/toolkit";
import { partsReducer } from "./features/parts";

export const store = configureStore({
  reducer: {
    parts: partsReducer,
  },
});
