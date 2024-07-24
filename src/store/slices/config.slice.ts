import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/apis";

export interface Config {
    id: number;
    configName: string;
    status: boolean;
}

export interface ConfigState {
    data: Config[] | null;
}

let initState: ConfigState  = {
    data: null
}

let configSlice = createSlice({
    name: "config",
    initialState: initState,
    reducers: {
        add: (state, action) => {
            state.data?.push(action.payload);
        },
        update: (state, action) => {
            const index = state.data?.findIndex(config => config.id === action.payload.id);
            if (index !== undefined && index !== -1 && state.data) {
                state.data[index] = action.payload;
            }
        },
        delete: (state, action) => {
            const index = state.data?.findIndex(config => config.id === action.payload);
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
    'config/findAllThunk',
    async () => {
        let res = await api.config.findAll();
        return res.data;
    }
)

export let configReducer = configSlice.reducer;
export let configAction = {
    ...configSlice.actions,
    findAllThunk
};