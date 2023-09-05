import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchData: null
}

const SearchSlice = createSlice({
    name: 'Search',
    initialState: initialState,
    reducers: {
        setSearch(state, action) {
            state.searchData = action.payload
        }
    }
})

export default SearchSlice
export const SearchActions = SearchSlice.actions