import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebar: false,
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.sidebar = !state.sidebar;
        },
    },
});

export const { toggleSidebar } = globalSlice.actions;
export default globalSlice.reducer;
