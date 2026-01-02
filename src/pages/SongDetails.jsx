import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Error, Loader } from '../components'
import { setActiveSong, playPause } from '../store/slices/playerSlice'
import { fetchSongDetailsAPI } from '../services/api'
import { useState } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'

const SongDetails = () => {
  const { songId } = useParams()
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { songs } = useSelector((state) => state.songs)
  const { theme } = useSelector((state) => state.theme)
  const [songDetails, setSongDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true)
        const response = await fetchSongDetailsAPI(songId)
        setSongDetails(response.data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (songId) {
      fetchDetails()
    }
  }, [songId])

  const handlePlayClick = () => {
    const songIndex = songs.findIndex((s) => s.key === songId)
    if (songIndex !== -1) {
      dispatch(setActiveSong({ song: songDetails, data: songs, i: songIndex }))
      dispatch(playPause(true))
    }
  }

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  if (loading) return <Loader title="Loading song details..." />
  if (error) return <Error message={error} />
  if (!songDetails) return <Error message="Song not found" />

  return (
    <div className="flex flex-col px-4 md:px-8">
      <div className="relative w-full flex flex-col">
        <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-80 h-28" />

        <div className="absolute inset-0 flex items-center">
          <div 
            className="sm:w-48 sm:h-48 w-28 h-28 rounded-full border-2 shadow-xl shadow-black flex items-center justify-center text-white text-4xl sm:text-6xl font-bold"
            style={{
              background: `linear-gradient(135deg, #1DB954 0%, #16A085 100%)`
            }}
          >
            🎵
          </div>
          <div className="ml-5">
            <p className={`font-bold sm:text-3xl text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {songDetails?.title}
            </p>
            <p className={`text-base sm:text-xl mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {songDetails?.subtitle}
            </p>
            <p className={`text-base sm:text-lg mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Genre: {songDetails?.genres?.primary || 'Unknown'}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full sm:mt-4 mt-3 flex items-center justify-center">
        <div
          onClick={isPlaying && activeSong?.key === songId ? handlePauseClick : handlePlayClick}
          className={`bg-primary w-14 h-14 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ${theme === 'dark' ? 'text-white' : 'text-white'}`}
        >
          {isPlaying && activeSong?.key === songId ? (
            <FaPause size={25} />
          ) : (
            <FaPlay size={25} />
          )}
        </div>
      </div>

      <div className="mt-10 mb-10">
        <h2 className={`font-bold text-3xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Lyrics
        </h2>
        <div className={`mt-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <p className="text-base">
            {songDetails?.lyrics || 'Lyrics not available for this song.'}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className={`font-bold text-3xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          More by {songDetails?.subtitle}
        </h2>
        <div className="mt-5 flex flex-wrap sm:justify-start justify-center gap-8">
          {songs
            ?.filter((song) => song.subtitle === songDetails?.subtitle && song.key !== songId)
            ?.slice(0, 5)
            ?.map((song, index) => (
              <Link key={song.key} to={`/song/${song.key}`}>
                <div className={`flex flex-col w-[250px] p-4 ${theme === 'dark' ? 'bg-white/5' : 'bg-white/80'} backdrop-blur-sm animate-slideup rounded-lg cursor-pointer`}>
                  <div 
                    className="w-full h-56 rounded-lg flex items-center justify-center text-white text-3xl font-bold"
                    style={{
                      background: `linear-gradient(135deg, #${['1DB954', 'FF6B6B', '4ECDC4', '45B7D1', 'FFA07A'][index % 5]} 0%, #${['16A085', 'E74C3C', '1ABC9C', '3498DB', 'E67E22'][index % 5]} 100%)`
                    }}
                  >
                    🎵
                  </div>
                  <p className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} truncate mt-4`}>
                    {song.title}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default SongDetails
