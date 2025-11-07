import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserRole = "manager" | "employee" | null;

interface AuthState {
  role: UserRole;
  isAuthenticated: boolean;
  username: string | null;
}

const initialState: AuthState = {
  role: null,
  isAuthenticated: false,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ role: UserRole; username: string }>) => {
      state.role = action.payload.role;
      state.username = action.payload.username;
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.role = null;
      state.username = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
