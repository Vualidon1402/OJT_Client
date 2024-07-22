import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export enum Roles {
  ADMIN = 1,
  MANAGER = 2,
  USER = 3,
}

interface Role {
  id: number;
  roleName: Roles;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  phone: string;
  avatar: string;
  fullName: string;
  point?: number;
  roles: Role[];
  permission?: string;
  status: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Register {
  username: string;
  password: string;
  email: string;
  phone: string;

}
function createMockUser(): User {
  return {
    id: 1,
    username: "mockuser",
    password: "mockpassword",
    email: "mockuser@example.com",
    phone: "1234567890",
    avatar: "https://example.com/avatar.jpg",
    fullName: "Mock User",
    point: 100,
    roles: [
      { id: 1, roleName: Roles.ADMIN },
      { id: 2, roleName: Roles.MANAGER },
    ],
    permission: "read,write",
    status: true,
    deleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
export interface UserState {
  data: User | null;
  loading: boolean;
}

const initialState: UserState = {
  data: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(findDataThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(findDataThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(findDataThunk.rejected, (state, action) => {
      state.data = null;
      localStorage.removeItem("token");
      state.loading = false;
    });
  },
});

const findDataThunk = createAsyncThunk("user/findData", async () => {

  return createMockUser();
});


export const userReducer = userSlice.reducer;
export const userActions = {
  ...userSlice.actions,
  findDataThunk,
};

