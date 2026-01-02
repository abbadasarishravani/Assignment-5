import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setActiveSong, playPause } from '../store/slices/playerSlice'
import PlayPause from './PlayPause'
import { useSelector } from 'react-redux'

const SongCard = ({ song, i, data, isPlaying, activeSong }) => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  return (
    <div className={`flex flex-col w-[250px] p-4 ${theme === 'dark' ? 'bg-white/5' : 'bg-white/80'} backdrop-blur-sm animate-slideup rounded-lg cursor-pointer`}>
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center ${activeSong?.title === song.title ? 'flex' : 'hidden'} group-hover:flex bg-black bg-opacity-70 rounded-lg z-10`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <div 
          className="w-full h-full rounded-lg flex items-center justify-center text-white text-4xl font-bold"
          style={{
            background: `linear-gradient(135deg, #${['1DB954', 'FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8', 'F7DC6F', 'BB8FCE'][i % 8] || '1DB954'} 0%, #${['16A085', 'E74C3C', '1ABC9C', '3498DB', 'E67E22', '27AE60', 'F39C12', '9B59B6'][i % 8] || '16A085'} 100%)`
          }}
        >
          🎵
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <p className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} truncate`}>
          <Link to={`/song/${song.key}`}>
            {song.title}
          </Link>
        </p>
        <p className={`text-sm truncate ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
          <Link to={`/song/${song.key}`}>
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SongCard
