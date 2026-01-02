import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './components/Sidebar'
import TopPlay from './components/TopPlay'
import SongDetails from './pages/SongDetails'
import Discover from './pages/Discover'
import Search from './pages/Search'
import Player from './components/Player'
import { fetchSongs } from './store/slices/songsSlice'
import { setTheme } from './store/slices/themeSlice'

function App() {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)
  const { currentSong } = useSelector((state) => state.player)

  useEffect(() => {
    dispatch(fetchSongs())
    const savedTheme = localStorage.getItem('theme') || 'dark'
    dispatch(setTheme(savedTheme))
  }, [dispatch])

  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-secondary' : 'bg-gray-100'}`}>
      <div className="flex relative">
        <Sidebar />
        <div className={`flex-1 flex flex-col ${theme === 'dark' ? 'bg-gradient-to-br from-secondary to-black' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
          <div className="flex flex-col xl:flex-row">
            <div className="flex-1 h-screen overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
              <div className="flex-1 h-fit pb-40 px-4 md:px-8">
                <Routes>
                  <Route path="/" element={<Discover />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/song/:songId" element={<SongDetails />} />
                </Routes>
              </div>
              <div className="xl:sticky relative top-0 h-fit">
                <TopPlay />
              </div>
            </div>
          </div>
        </div>
      </div>
      {currentSong && <Player />}
    </div>
  )
}

export default App
