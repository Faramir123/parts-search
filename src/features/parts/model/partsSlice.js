// model/partsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands, fetchOffers } from "./partsThunks";

const initialState = {
  number: "",
  brands: [],
  selectedBrand: "",
  offers: [],
  brandsStatus: "idle",
  offersStatus: "idle",
  brandsError: "",
  offersError: "",
};

const partsSlice = createSlice({
  name: "parts",
  initialState,
  reducers: {
    setNumber(state, action) {
      state.number = action.payload;
      state.brands = [];
      state.selectedBrand = "";
      state.offers = [];
      state.brandsStatus = "idle";
      state.offersStatus = "idle";
      state.brandsError = "";
      state.offersError = "";
    },
    selectBrand(state, action) {
      state.selectedBrand = action.payload;
      state.offers = [];
      state.offersStatus = "idle";
      state.offersError = "";
    },
    clearSearch(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers(builder) {
    builder
      // Обработка fetchBrands
      .addCase(fetchBrands.pending, (state) => {
        state.brandsStatus = "loading";
        state.brandsError = "";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsStatus = "succeeded";
        // В thunk мы уже отфильтровали уникальные бренды
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.brandsStatus = "failed";
        state.brandsError =
          action.payload || action.error.message || "Ошибка поиска.";
      })

      // Обработка fetchOffers
      .addCase(fetchOffers.pending, (state) => {
        state.offersStatus = "loading";
        state.offersError = "";
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offersStatus = "succeeded";
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.offersStatus = "failed";
        state.offersError =
          action.payload ||
          action.error.message ||
          "Ошибка загрузки предложений.";
      });
  },
});

export const { setNumber, selectBrand, clearSearch } = partsSlice.actions;
export default partsSlice.reducer;
