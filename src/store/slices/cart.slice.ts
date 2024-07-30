/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetailModel } from "./product.slice";
import apis from "@/apis";
import { StoreType } from "..";
import { userActions } from "./user.slice";

export interface addToCart {
  userId: number | undefined;
  productDetailId: number;
  quantity: number;
}
export interface UpdateCart {
  userId: number | undefined;
  totalAmount: number | undefined;
  quantity: number;
}
export interface ProductDetail {
  productDetailName: string;
  discountPrice: number;
  image: string;
}

export interface CartItemData {
  id: number;
  quantity: number;
}

export interface Cart {
  name: string | undefined;
  id: number;
  productDetail: ProductDetailModel;
  userId: number;
  quantity: number;
}
export interface CartState {
  data: Cart[] | null;
  loading: boolean;
}
const initialState: CartState = {
  data: null,
  loading: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    add: (state, action: PayloadAction<Cart>) => {
      state.data?.push(action.payload);
    },
    delete: (state, action: PayloadAction<number>) => {
      const index = state.data?.findIndex((item) => item.id === action.payload);
      if (index !== undefined && index !== -1 && state.data) {
        state.data.splice(index, 1);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.data?.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
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
  "cart/findAllThunk",
  async (_, { getState, dispatch }) => {
    const state = getState() as StoreType;
    let userId = state.userStore.data?.id;
    // Nếu không có userId, thử tải lại dữ liệu người dùng
    if (!userId) {
      await dispatch(userActions.findDataThunk());
      // Lấy lại state sau khi tải dữ liệu người dùng
      const updatedState = getState() as StoreType;
      userId = updatedState.userStore.data?.id;
    }
    if (!userId) {
      console.error("UserId is null or undefined. Please log in.");
      return [];
    }
    try {
      const response = await apis.cart.getCartItem(userId);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return [];
    }
  }
);

export const cartReducer = cartSlice.reducer;
export const cartAction = {
  ...cartSlice.actions,
  findAllThunk,
};
