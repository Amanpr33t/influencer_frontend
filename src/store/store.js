import { configureStore } from "@reduxjs/toolkit";
import FormSlice from "./slices/formSlice";
import SortSlice from "./slices/sortSlice";
import EditSlice from "./slices/editSlice";
import SearchSlice from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    Form: FormSlice.reducer,
    Sort: SortSlice.reducer,
    Edit: EditSlice.reducer,
    Search: SearchSlice.reducer
  }
})

export default store