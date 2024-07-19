import api from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Category {
    id?: number;
    categoryName: string;
    createdAt?: string;
    image: string;
    status?: boolean;
}

export interface CategoryState {
    data: Category[] | null;
}

const initState: CategoryState  = {
    data: null
}


const categorySlice = createSlice({
  name: "category",
  initialState: initState,
  reducers: {
    add: (state, action) => {
      state.data?.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findAllThunk.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

const findAllThunk = createAsyncThunk("category/findAllThunk", async () => {
  const res = await api.category.findAll();
  return res.data;
});

export const categoryReducer = categorySlice.reducer;
export const categoryAction = {
  ...categorySlice.actions,
  findAllThunk,
};