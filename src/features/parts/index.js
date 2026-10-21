// features/parts/index.js
export { default as partsReducer } from "./model/partsSlice";
export * from "./model/partsSlice"; // Экшены (setNumber и т.д.)
export * from "./model/partsThunks"; // Thunks (fetchBrands и т.д.)
