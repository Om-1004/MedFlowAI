import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    userName: "Om",
    error: null,
    loading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInState: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.userName = action.payload;
            state.loading = false;
            state.error = null;
        }
    }
})

export const {signInState, signInSuccess} = userSlice.actions;

export default userSlice.reducer;