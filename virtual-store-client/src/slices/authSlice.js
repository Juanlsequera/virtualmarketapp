import {
  createSlice
} from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    email: null,
    token: null,
    role: null,
    name: null,
    id: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.token = null;
      state.role = null;
      state.name = null;
      state.name = null;
      window.sessionStorage.removeItem("token");
    },
  },
});

export const {
  setUser,
  logout
} = userSlice.actions;

export default userSlice.reducer;