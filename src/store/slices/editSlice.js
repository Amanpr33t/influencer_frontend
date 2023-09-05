import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEdit: false,
    influencerId: null,
    influencerName: null,
    socialMedia: null
}
const EditSlice = createSlice({
    name: 'Edit',
    initialState: initialState,
    reducers: {
        setEdit(state, action) {
            state.isEdit = action.payload.isEdit
            state.influencerId = action.payload.influencerId
            state.influencerName = action.payload.influencerName
            state.socialMedia = action.payload.socialMedia
        }
    }
})

export default EditSlice
export const EditActions = EditSlice.actions