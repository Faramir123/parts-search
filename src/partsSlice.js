import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

function getGoods(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.goods)) return data.goods;
  return [];
}

async function requestParts({ number, brand }, { signal, rejectWithValue }) {
  const params = new URLSearchParams({ number });

  if (brand) params.set("brand", brand);

  try {
    const response = await fetch(`/api/search?${params}`, { signal });
    const data = await response.json();

    if (!response.ok || data?.error) {
      return rejectWithValue(data?.error || "Не удалось выполнить запрос.");
    }

    return getGoods(data);
  } catch (error) {
    if (error.name === "AbortError") throw error;
    return rejectWithValue(
      "Ошибка сети. Проверьте подключение и повторите запрос.",
    );
  }
}

export const fetchBrands = createAsyncThunk(
  "parts/fetchBrands",
  async (number, thunkApi) => requestParts({ number }, thunkApi),
);

export const fetchOffers = createAsyncThunk(
  "parts/fetchOffers",
  async ({ number, brand }, thunkApi) =>
    requestParts({ number, brand }, thunkApi),
);
