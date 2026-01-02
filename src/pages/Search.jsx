import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Error, Loader, SongCard } from '../components'

const Search = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { songs, loading, error } = useSelector((state) => state.songs)
  const { theme } = useSelector((state) => state.theme)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter by search term
  const searchedSongs = searchTerm
    ? songs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artists?.some(artist => artist.alias?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : []

  if (loading) return <Loader title="Loading songs..." />

  if (error) return <Error message={error} />

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col items-center mt-4 mb-10">
        <h2 className={`font-bold text-3xl ${theme === 'dark' ? 'text-white' : 'text-black'} text-center mb-6`}>
          Search Songs
        </h2>
        <div className="flex items-center w-full max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search songs, artists..."
            className={`w-full px-4 py-3 rounded-lg border text-lg ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black'} focus:outline-none focus:ring-2 focus:ring-primary`}
            autoFocus
          />
        </div>
        {searchTerm && (
          <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Found {searchedSongs.length} {searchedSongs.length === 1 ? 'song' : 'songs'}
          </p>
        )}
      </div>

      {!searchTerm ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className={`text-6xl mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
            🔍
          </div>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Search for your favorite songs
          </p>
          <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            Try searching for "BTS", "The Weeknd", or any song title
          </p>
        </div>
      ) : searchedSongs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className={`text-6xl mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
            😕
          </div>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            No songs found
          </p>
          <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            Try a different search term
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {searchedSongs.map((song, i) => (
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
      )}
    </div>
  )
}

export default Search
