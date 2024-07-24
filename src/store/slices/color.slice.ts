import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/apis";

export interface Color {
    id: number;
    colorName: string;
    status: boolean;
}

export interface ColorState {
    data: Color[] | null;
}

let initState: ColorState  = {
    data: null
}

let colorSlice = createSlice({
    name: "color",
    initialState: initState,
    reducers: {
        add: (state, action) => {
            state.data?.push(action.payload);
        },
        update: (state, action) => {
            const index = state.data?.findIndex(color => color.id === action.payload.id);
            if (index !== undefined && index !== -1 && state.data) {
                state.data[index] = action.payload;
            }
        },
        delete: (state, action) => {
            const index = state.data?.findIndex(color => color.id === action.payload);
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
    'color/findAllThunk',
    async () => {
        let res = await api.color.findAll();
        return res.data;
    }
)

export let colorReducer = colorSlice.reducer;
export let colorAction = {
    ...colorSlice.actions,
    findAllThunk
};