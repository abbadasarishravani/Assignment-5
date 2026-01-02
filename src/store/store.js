import { configureStore } from '@reduxjs/toolkit'
import songsReducer from './slices/songsSlice'
import playerReducer from './slices/playerSlice'
import themeReducer from './slices/themeSlice'
import filterReducer from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    player: playerReducer,
    theme: themeReducer,
    filter: filterReducer,
  },
})
