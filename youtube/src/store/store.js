import { configureStore } from "@reduxjs/toolkit"
import navBarSlice from "./slices/navBarSlice"

const store = configureStore({
    reducer:{
        navBarStatus:navBarSlice
    }
})
export default store