import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HiHome, HiSearch, HiMusicNote } from 'react-icons/hi'
import { toggleTheme } from '../store/slices/themeSlice'
import { FaMoon, FaSun } from 'react-icons/fa'

const Sidebar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)

  const links = [
    { name: 'Discover', to: '/', icon: HiHome },
    { name: 'Search', to: '/search', icon: HiSearch },
    { name: 'Your Library', to: '/library', icon: HiMusicNote },
  ]

  return (
    <div className={`hidden md:flex flex-col w-[240px] py-4 px-4 ${theme === 'dark' ? 'bg-black' : 'bg-white'} border-r ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="flex items-center mb-8">
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Music<span className="text-primary">App</span>
        </h1>
      </div>

      <nav className="flex flex-col space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = location.pathname === link.to
          return (
            <Link
              key={link.name}
              to={link.to}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? `${theme === 'dark' ? 'bg-primary text-white' : 'bg-primary text-white'}`
                  : `${theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-8">
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          <span className="font-medium">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
