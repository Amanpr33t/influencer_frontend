import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortURL: null
}

const SortSlice = createSlice({
    name: 'Sort',
    initialState: initialState,
    reducers: {
        setSort(state, action) {
            state.sortURL = action.payload
        }
    }
})

export default SortSlice
export const SortActions = SortSlice.actions