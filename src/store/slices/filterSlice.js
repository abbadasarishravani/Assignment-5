import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    selectedGenre: 'all',
    searchTerm: '',
  },
  reducers: {
    setGenre: (state, action) => {
      state.selectedGenre = action.payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
  },
})

export const { setGenre, setSearchTerm } = filterSlice.actions
export default filterSlice.reducer
