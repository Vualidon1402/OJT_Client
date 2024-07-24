import apis from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AddBanner {
  id?: number;
  title: string;
  image: string;
  status?: boolean;
}


  export interface EditModalProps {
    banner: Banner;
    show: boolean;
    handleClose: () => void;
    handleSave: (updatedBanner: Banner) => void;
  }

export interface Banner {
  id: number;
  title: string;
  image: string;
  status?: boolean;
}
export interface BannerState {
  data: Banner[] | null;
  loading: boolean;
}
const initialState: BannerState = {
    data: null,
    loading: false,
    };
const bannerSlice = createSlice({
    name: "banner",
    initialState: initialState,
    reducers: {
        add: (state, action) => {
            state.data?.push(action.payload);
        },
        update: (state, action) => {
            const index = state.data?.findIndex(banner => banner.id === action.payload.id);
            if (index !== undefined && index !== -1 && state.data) {
                state.data[index] = action.payload;
            }
        },
        delete: (state, action) => {
            const index = state.data?.findIndex(banner => banner.id === action.payload);
            if (index !== undefined && index !== -1 && state.data) {
                state.data[index].status = false;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(findAllThunk.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
})
const findAllThunk = createAsyncThunk(
    'banner/findAllThunk',
    async () => {
        const res = await apis.banner.getAllBanner();
        return res.data;
    }
)
export const bannerReducer = bannerSlice.reducer;
export const bannerAction = {
  ...bannerSlice.actions,
  findAllThunk,
};
