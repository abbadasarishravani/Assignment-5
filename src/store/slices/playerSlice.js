import { createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentSong: null,
    currentSongs: [],
    currentIndex: 0,
    isActive: false,
    isPlaying: false,
    activeSong: null,
  },
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song
      state.currentIndex = action.payload.index
      state.currentSongs = action.payload.songs
      state.isActive = true
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload
      state.isActive = true
    },
    nextSong: (state) => {
      if (state.currentIndex < state.currentSongs.length - 1) {
        state.currentIndex += 1
        state.activeSong = state.currentSongs[state.currentIndex]
      } else {
        state.currentIndex = 0
        state.activeSong = state.currentSongs[0]
      }
    },
    prevSong: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1
        state.activeSong = state.currentSongs[state.currentIndex]
      } else {
        state.currentIndex = state.currentSongs.length - 1
        state.activeSong = state.currentSongs[state.currentIndex]
      }
    },
    playPause: (state, action) => {
      state.isPlaying = action.payload
    },
  },
})

export const { setActiveSong, setCurrentSong, nextSong, prevSong, playPause } = playerSlice.actions
export default playerSlice.reducer
