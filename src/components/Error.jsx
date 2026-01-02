import { useSelector } from 'react-redux'

const Error = ({ message }) => {
  const { theme } = useSelector((state) => state.theme)

  return (
    <div className="flex flex-col justify-center items-center w-full py-10">
      <div className={`text-6xl mb-4 ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`}>
        ⚠️
      </div>
      <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        {message || 'Something went wrong. Please try again.'}
      </p>
    </div>
  )
}

export default Error
