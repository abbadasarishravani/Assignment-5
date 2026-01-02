import { FaPause, FaPlay } from 'react-icons/fa'

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => {
  return (
    <>
      {isPlaying && activeSong?.title === song.title ? (
        <FaPause
          size={35}
          className="text-gray-300"
          onClick={handlePause}
        />
      ) : (
        <FaPlay
          size={35}
          className="text-gray-300"
          onClick={handlePlay}
        />
      )}
    </>
  )
}

export default PlayPause
