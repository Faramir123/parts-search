// model/partsThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestParts } from "../api/partsApi";

export const fetchBrands = createAsyncThunk(
  "parts/fetchBrands",
  async (number, { signal, rejectWithValue }) => {
    try {
      // Поскольку API возвращает массив товаров (goods),
      // нам нужно извлечь из него уникальные бренды для первого шага.
      const goods = await requestParts({ number }, { signal });

      const brands = goods
        .map((item) => item?.brand)
        .filter((brand, index, arr) => brand && arr.indexOf(brand) === index);

      return brands;
    } catch (error) {
      if (error.name === "AbortError") throw error;
      return rejectWithValue(error.message);
    }
  },
);

export const fetchOffers = createAsyncThunk(
  "parts/fetchOffers",
  async ({ number, brand }, { signal, rejectWithValue }) => {
    try {
      const goods = await requestParts({ number, brand }, { signal });
      return goods;
    } catch (error) {
      if (error.name === "AbortError") throw error;
      return rejectWithValue(error.message);
    }
  },
);
