import apis from "@/apis";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Voucher {
  id?: number;
  code: string;
  discountAmount: number;
  expirationDate: string;
  used?: boolean;
}
export interface ApplyVoucher {
  voucherCode: string;
  totalAmount: number | undefined;
}

export interface VoucherUpdate {
  id?: number | undefined;
  code: string;
  discountAmount: number;
  expirationDate: string;
  used?: boolean;
}
export interface VoucherState {
  vouchers: Voucher[];
  loading: boolean;
}

const initState: VoucherState = {
  vouchers: [],
  loading: false,
};
const voucherSlice = createSlice({
  name: "voucher",
  initialState: initState,
  reducers: {
    add: (state, action: PayloadAction<Voucher>) => {
      state.vouchers.push(action.payload);
    },
    delete: (state, action: PayloadAction<number>) => {
      const index = state.vouchers.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.vouchers.splice(index, 1);
      }
    },
    update: (state, action: PayloadAction<Voucher>) => {
      const index = state.vouchers.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.vouchers[index] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      findAllThunk.fulfilled,
      (state, action: PayloadAction<Voucher[]>) => {
        state.vouchers = action.payload;
      }
    );
  },
});
const findAllThunk = createAsyncThunk("voucher/findAllThunk", async () => {
    const res = await apis.voucher.vouchers();
    return res.data;
    }
);
export const voucherReducer = voucherSlice.reducer;
export const voucherAction = {
  ...voucherSlice.actions,
  findAllThunk,
};
