import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/apis";

export interface Brand {
    id: number;
    brandName: string;
    createdAt?: string;
    description: string;
    image: string;
    status: boolean;
}

export interface BrandState {
    data: Brand[] | null;
}

let initState: BrandState  = {
    data: null
}

let brandSlice = createSlice({
    name: "brand",
    initialState: initState,
    reducers: {
        add: (state, action) => {
            state.data?.push(action.payload);
        },
        update: (state, action) => {
            const index = state.data?.findIndex(brand => brand.id === action.payload.id);
            if (index !== undefined && index !== -1 && state.data) {
                state.data[index] = action.payload;
            }
        },
        delete: (state, action) => {
            const index = state.data?.findIndex(brand => brand.id === action.payload);
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

let findAllThunk = createAsyncThunk(
    'brand/findAllThunk',
    async () => {
        let res = await api.brand.findAll();
        return res.data;
    }
)

export let brandReducer = brandSlice.reducer;
export let brandAction = {
    ...brandSlice.actions,
    findAllThunk
};