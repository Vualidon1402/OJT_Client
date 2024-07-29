import apis from "@/apis";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DiscountEvent {
  id?: number | undefined;
  name: string;
  endDate: string;
  startDate: string;
  discountPercentage: number;
}
export interface DiscountEventAdd {
  name: string;
  endDate: string;
  startDate: string;
  discountPercentage: number;
}
export interface DiscountEventState {
  events: DiscountEvent[];
  loading: boolean;
}
const initialState: DiscountEventState = {
  events: [],
  loading: false,
};

const discountEventSlice = createSlice({
  name: "discountEvent",
  initialState: initialState,
  reducers: {
    add: (state, action: PayloadAction<DiscountEvent>) => {
      state.events.push(action.payload);
    },
    delete: (state, action: PayloadAction<number>) => {
      const index = state.events.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.events.splice(index, 1);
      }
    },
    update: (state, action: PayloadAction<DiscountEvent>) => {
      const index = state.events.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      findAllThunk.fulfilled,
      (state, action: PayloadAction<DiscountEvent[]>) => {
        state.events = action.payload;
      }
    );
  },
});

const findAllThunk = createAsyncThunk(
  "discountEvent/findAllThunk",
  async () => {
    try {
      const response = await apis.discount.discount();
      console.log("Discount events:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching discount events:", error);
      return [];
    }
  }
);


export const discounteventReducer = discountEventSlice.reducer;
export const discounteventAction = {
  ...discountEventSlice.actions,
  findAllThunk,
};
