import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPause, FaPlay } from 'react-icons/fa'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { nextSong, prevSong, playPause } from '../store/slices/playerSlice'
import { Link } from 'react-router-dom'
import { getSongAudioUrl } from '../utils/audioGenerator'

const Player = () => {
  const { activeSong, currentSongs, currentIndex, isPlaying } = useSelector((state) => state.player)
  const { theme } = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current && activeSong) {
      if (isPlaying) {
        // Ensure volume is set
        audioRef.current.volume = isMuted ? 0 : volume
        
        // Play audio - handle both immediate and delayed play
        const playAudio = async () => {
          try {
            await audioRef.current.play()
          } catch (err) {
            console.error('Play error:', err)
            // If audio isn't ready, wait for it
            if (audioRef.current.readyState < 2) {
              audioRef.current.addEventListener('canplay', () => {
                audioRef.current?.play().catch(console.error)
              }, { once: true })
            }
          }
        }
        
        // Try to play immediately
        playAudio()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, activeSong, volume, isMuted])

  useEffect(() => {
    if (activeSong && audioRef.current) {
      // Always use generated audio for reliability
      const audioUrl = getSongAudioUrl(activeSong.key)
      audioRef.current.src = audioUrl
      audioRef.current.volume = isMuted ? 0 : volume
      audioRef.current.load()
    }
  }, [activeSong, volume, isMuted])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.5
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!activeSong?.title) return null

  return (
    <div className={`absolute h-28 bottom-0 left-0 right-0 flex animate-slideup ${theme === 'dark' ? 'bg-gradient-to-r from-secondary to-black' : 'bg-gradient-to-r from-gray-100 to-gray-200'} backdrop-blur-lg z-10`}>
      <div className="relative w-full flex items-center justify-between px-8">
        <div className="flex-1 flex items-center">
          <div className="w-16 h-16 mr-4">
            <div 
              className="w-full h-full rounded-lg flex items-center justify-center text-white text-xl font-bold"
              style={{
                background: `linear-gradient(135deg, #1DB954 0%, #16A085 100%)`
              }}
            >
              🎵
            </div>
          </div>
          <div className="flex-1">
            <Link to={`/song/${activeSong?.key}`}>
              <p className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} truncate`}>
                {activeSong?.title}
              </p>
            </Link>
            <Link to={`/song/${activeSong?.key}`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                {activeSong?.subtitle}
              </p>
            </Link>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex-1 flex flex-row items-center justify-center">
            <button
              onClick={() => dispatch(prevSong())}
              className={`mx-2 ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-primary transition-colors`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
              </svg>
            </button>
            <button
              onClick={() => dispatch(playPause(!isPlaying))}
              className={`mx-2 ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-primary transition-colors`}
            >
              {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
            </button>
            <button
              onClick={() => dispatch(nextSong())}
              className={`mx-2 ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-primary transition-colors`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0011 6v2.798l-5.445-3.63z" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex flex-row items-center">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {formatTime(currentTime)}
            </p>
            <input
              type="range"
              value={currentTime}
              min="0"
              max={duration || 0}
              onChange={handleSeek}
              className="mx-4 h-1 w-64 rounded-lg appearance-none cursor-pointer bg-gray-300"
              style={{
                background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${(currentTime / duration) * 100}%, #d1d5db ${(currentTime / duration) * 100}%, #d1d5db 100%)`
              }}
            />
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {formatTime(duration)}
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-end">
          <button onClick={toggleMute} className={`mr-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {isMuted ? <HiVolumeOff size={25} /> : <HiVolumeUp size={25} />}
          </button>
          <input
            type="range"
            value={isMuted ? 0 : volume}
            min="0"
            max="1"
            step="0.01"
            onChange={handleVolumeChange}
            className="h-1 w-24 rounded-lg appearance-none cursor-pointer bg-gray-300"
            style={{
              background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${(isMuted ? 0 : volume) * 100}%, #d1d5db ${(isMuted ? 0 : volume) * 100}%, #d1d5db 100%)`
            }}
          />
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onCanPlay={() => {
            // When audio is ready, play if it should be playing
            if (isPlaying && audioRef.current) {
              audioRef.current.play().catch(err => {
                console.error('Play on canplay error:', err)
              })
            }
          }}
          onEnded={() => dispatch(nextSong())}
          onError={(e) => {
            console.error('Audio error:', e)
            console.error('Audio error details:', audioRef.current?.error)
          }}
          preload="auto"
        />
      </div>
    </div>
  )
}

export default Player
