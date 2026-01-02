import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setActiveSong, playPause } from '../store/slices/playerSlice'
import PlayPause from './PlayPause'

const TopPlay = () => {
  const dispatch = useDispatch()
  const { topCharts } = useSelector((state) => state.songs)
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { theme } = useSelector((state) => state.theme)

  const topPlays = topCharts?.slice(0, 5)

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: topCharts, i }))
    dispatch(playPause(true))
  }

  return (
    <div className={`xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Top Charts
          </h2>
          <Link to="/top-charts">
            <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} cursor-pointer`}>
              See more
            </p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <div
              key={song.key}
              className={`w-full flex flex-row items-center hover:${theme === 'dark' ? 'bg-white/10' : 'bg-black/5'} py-2 p-4 rounded-lg cursor-pointer mb-2`}
            >
              <h3 className="font-bold text-base mr-3">{i + 1}.</h3>
              <div className="flex-1 flex flex-row justify-between items-center">
                <div 
                  className="w-20 h-20 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, #${['1DB954', 'FF6B6B', '4ECDC4', '45B7D1', 'FFA07A'][i % 5]} 0%, #${['16A085', 'E74C3C', '1ABC9C', '3498DB', 'E67E22'][i % 5]} 100%)`
                  }}
                >
                  🎵
                </div>
                <div className="flex-1 flex flex-col mx-3">
                  <Link to={`/song/${song.key}`}>
                    <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} truncate`}>
                      {song.title}
                    </p>
                  </Link>
                  <Link to={`/song/${song.key}`}>
                    <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} truncate mt-1`}>
                      {song.subtitle}
                    </p>
                  </Link>
                </div>
              </div>
              <PlayPause
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={song}
                handlePause={handlePauseClick}
                handlePlay={() => handlePlayClick(song, i)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopPlay
