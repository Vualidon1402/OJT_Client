/* eslint-disable @typescript-eslint/no-explicit-any */
import apis from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StoreType } from "..";


export interface WishList {
  id: number;
  product: any;
  userId: string | number | undefined;
  productId: string | number | undefined;
}
export interface WishListState {
  data: WishList[] | null;
  loading: boolean;
}
const initialState: WishListState = {
  data: null,
  loading: false,
};
const wishListSlice = createSlice({
  name: "wishList",
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      state.data?.push(action.payload);
    },
    delete: (state, action) => {
      const index = state.data?.findIndex(
        (item) => item.productId === action.payload
      );
      if (index !== undefined && index !== -1 && state.data) {
        state.data.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findAllThunk.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
const findAllThunk = createAsyncThunk(
  "wishList/findAllThunk",
  async (userId: number | undefined, { getState }) => {
    const state = getState() as StoreType;
    const userStore = state.userStore.data;
    if (!userStore || !userStore.id) {
      console.error("UserStore or UserStore.id is null or undefined");
      return [];
    }

    try {
      const response = await apis.wishlist.getWishList(userId);
      return response.data;
    } catch (error) {
      console.error("Error fetching wishList:", error);
      return [];
    }
  }
);

export const wishListReducer = wishListSlice.reducer;
export const wishListActions = {
  ...wishListSlice.actions,
  findAllThunk,
};
