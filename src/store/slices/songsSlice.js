import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSongsAPI } from '../../services/api'

export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchSongsAPI()
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
    topCharts: [],
    aroundYou: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false
        state.songs = action.payload
        state.topCharts = action.payload.slice(0, 20)
        state.aroundYou = action.payload.slice(20, 40)
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default songsSlice.reducer
