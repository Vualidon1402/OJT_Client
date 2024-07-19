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

let initState: CategoryState  = {
    data: null
}


let categorySlice = createSlice({
    name: "category",
    initialState: initState,
    reducers: {
        add: (state, action) => {
            state.data?.push(action.payload);
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