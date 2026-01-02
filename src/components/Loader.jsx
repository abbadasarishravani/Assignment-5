import { useSelector } from 'react-redux'

const Loader = ({ title }) => {
  const { theme } = useSelector((state) => state.theme)

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className={`mt-4 text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        {title || 'Loading...'}
      </p>
    </div>
  )
}

export default Loader
