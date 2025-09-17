import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  fullname: "",
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInState: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.userName = action.payload;
      state.loading = false;
      state.error = null;
    },
    signOutState: (state) => {
      state.userName = null;
      state.email = null;
      state.loading = true;
    },
  },
});

export const { signInState, signInSuccess, signOutState } = userSlice.actions;

export default userSlice.reducer;
