import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isForm: false
}

const FormSlice = createSlice({
    name: 'Form',
    initialState: initialState,
    reducers: {
        setForm(state, action) {
            state.isForm = action.payload
        }
    }
})

export default FormSlice
export const FormActions = FormSlice.actions