
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  navBarStatus: false,
}

export const navBarSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateNavStatus: (state, action) => {
      state.navBarStatus = !state.navBarStatus
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateNavStatus } = navBarSlice.actions

export default navBarSlice.reducer