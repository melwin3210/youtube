import { configureStore } from "@reduxjs/toolkit"
import navBarSlice from "./slices/navBarSlice"
import searchSuggestionSlice from "./slices/searchSuggestionSlice"

const store = configureStore({
    reducer:{
        navBarStatus:navBarSlice,
        searchSuggestion:searchSuggestionSlice
    }
})
export default store