import api from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Category {
    id: number;
    categoryName: string;
    description: string;
    createdAt?: string;
    image: string;
    status: boolean;
}

export interface CategoryState {
    data: Category[] | null;
}

let initState: CategoryState  = {
    data: null
}

let categorySlice = createSlice({
    name: "category",
    initialState: initState,
    reducers: {
        add: (state, action) => {
            state.data?.push(action.payload);
        },
        update: (state, action) => {
            const index = state.data?.findIndex(category => category.id === action.payload.id);
            if (index !== undefined && index !== -1 && state.data) {
                state.data[index] = action.payload;
            }
        },
        delete: (state, action) => {
            const index = state.data?.findIndex(category => category.id === action.payload);
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
    'category/findAllThunk',
    async () => {
        let res = await api.category.findAll();
        return res.data;
    }
)

export let categoryReducer = categorySlice.reducer;
export let categoryAction = {
    ...categorySlice.actions,
    findAllThunk
};