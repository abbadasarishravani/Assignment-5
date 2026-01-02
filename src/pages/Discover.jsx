import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Error, Loader, SongCard } from '../components'
import { genres } from '../assets/constants'
import { setGenre } from '../store/slices/filterSlice'

const Discover = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { selectedGenre } = useSelector((state) => state.filter)
  const { songs, loading, error } = useSelector((state) => state.songs)
  const { theme } = useSelector((state) => state.theme)
  const [searchTerm, setSearchTerm] = useState('')

  const genreTitle = genres.find(g => g.value === selectedGenre)?.title || 'All'

  // Filter songs by genre
  const filteredSongs = songs.filter((song) => {
    if (selectedGenre === 'all' || !selectedGenre) return true
    const songGenre = song.genres?.primary?.toLowerCase()
    const selectedGenreLower = selectedGenre.toLowerCase()
    // Handle special cases like R&B
    if (selectedGenreLower === 'r&b') {
      return songGenre === 'r&b' || songGenre === 'r and b'
    }
    return songGenre === selectedGenreLower
  })

  // Filter by search term
  const searchedSongs = searchTerm
    ? filteredSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredSongs

  if (loading) return <Loader title="Loading songs..." />

  if (error) return <Error message={error} />

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className={`font-bold text-3xl ${theme === 'dark' ? 'text-white' : 'text-black'} text-left`}>
          Discover {genreTitle}
        </h2>
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search songs..."
            className={`px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black'} focus:outline-none focus:ring-2 focus:ring-primary`}
          />
        </div>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {genres.map((genre) => (
          <button
            key={genre.value}
            onClick={() => dispatch(setGenre(genre.value))}
            className={`m-2 px-4 py-2 rounded-full border transition-all ${
              selectedGenre === genre.value
                ? 'bg-primary text-white border-primary'
                : theme === 'dark'
                ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                : 'bg-white text-black border-gray-300 hover:bg-gray-100'
            }`}
          >
            {genre.title}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8 mt-10">
        {searchedSongs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            data={searchedSongs}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  )
}

export default Discover
