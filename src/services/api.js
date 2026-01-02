import axios from 'axios'

// Helper function to generate placeholder images
const getPlaceholderImage = (title, index) => {
  // Using placeholder.com with better formatting
  const colors = ['1DB954', 'FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8', 'F7DC6F', 'BB8FCE', '85C1E2', 'F8B739', 'E74C3C', '9B59B6', '3498DB', '1ABC9C', 'F39C12', 'E67E22', '16A085', '27AE60', '2980B9', '8E44AD']
  const color = colors[index % colors.length]
  return `https://via.placeholder.com/300/${color}/FFFFFF?text=${encodeURIComponent(title)}`
}

// Mock data for songs
const mockSongs = [
  {
    key: '1',
    title: 'Blinding Lights',
    subtitle: 'The Weeknd',
    images: { coverart: getPlaceholderImage('Blinding Lights', 0) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'The Weeknd' }],
  },
  {
    key: '2',
    title: 'Watermelon Sugar',
    subtitle: 'Harry Styles',
    images: { coverart: getPlaceholderImage('Watermelon Sugar', 1) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'Harry Styles' }],
  },
  {
    key: '3',
    title: 'Levitating',
    subtitle: 'Dua Lipa',
    images: { coverart: getPlaceholderImage('Levitating', 2) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'Dua Lipa' }],
  },
  {
    key: '4',
    title: 'Good 4 U',
    subtitle: 'Olivia Rodrigo',
    images: { coverart: getPlaceholderImage('Good 4 U', 3) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }] },
    genres: { primary: 'Rock' },
    artists: [{ alias: 'Olivia Rodrigo' }],
  },
  {
    key: '5',
    title: 'Stay',
    subtitle: 'The Kid LAROI & Justin Bieber',
    images: { coverart: getPlaceholderImage('Stay', 4) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'The Kid LAROI' }, { alias: 'Justin Bieber' }],
  },
  {
    key: '6',
    title: 'Heat Waves',
    subtitle: 'Glass Animals',
    images: { coverart: getPlaceholderImage('Heat Waves', 5) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' }] },
    genres: { primary: 'Indie' },
    artists: [{ alias: 'Glass Animals' }],
  },
  {
    key: '7',
    title: 'Industry Baby',
    subtitle: 'Lil Nas X & Jack Harlow',
    images: { coverart: getPlaceholderImage('Industry Baby', 6) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' }] },
    genres: { primary: 'Hip-Hop' },
    artists: [{ alias: 'Lil Nas X' }, { alias: 'Jack Harlow' }],
  },
  {
    key: '8',
    title: 'Montero',
    subtitle: 'Lil Nas X',
    images: { coverart: getPlaceholderImage('Montero', 7) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }] },
    genres: { primary: 'Hip-Hop' },
    artists: [{ alias: 'Lil Nas X' }],
  },
  {
    key: '9',
    title: 'Peaches',
    subtitle: 'Justin Bieber ft. Daniel Caesar & Giveon',
    images: { coverart: getPlaceholderImage('Peaches', 8) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' }] },
    genres: { primary: 'R&B' },
    artists: [{ alias: 'Justin Bieber' }],
  },
  {
    key: '10',
    title: 'Save Your Tears',
    subtitle: 'The Weeknd',
    images: { coverart: getPlaceholderImage('Save Your Tears', 9) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'The Weeknd' }],
  },
  {
    key: '11',
    title: 'Shivers',
    subtitle: 'Ed Sheeran',
    images: { coverart: getPlaceholderImage('Shivers', 10) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'Ed Sheeran' }],
  },
  {
    key: '12',
    title: 'Bad Habits',
    subtitle: 'Ed Sheeran',
    images: { coverart: getPlaceholderImage('Bad Habits', 11) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'Ed Sheeran' }],
  },
  {
    key: '13',
    title: 'As It Was',
    subtitle: 'Harry Styles',
    images: { coverart: getPlaceholderImage('As It Was', 12) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'Harry Styles' }],
  },
  {
    key: '14',
    title: 'About Damn Time',
    subtitle: 'Lizzo',
    images: { coverart: getPlaceholderImage('About Damn Time', 13) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'Lizzo' }],
  },
  {
    key: '15',
    title: 'First Class',
    subtitle: 'Jack Harlow',
    images: { coverart: getPlaceholderImage('First Class', 14) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3' }] },
    genres: { primary: 'Hip-Hop' },
    artists: [{ alias: 'Jack Harlow' }],
  },
  {
    key: '16',
    title: 'Flowers',
    subtitle: 'Miley Cyrus',
    images: { coverart: getPlaceholderImage('Flowers', 15) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'Miley Cyrus' }],
  },
  {
    key: '17',
    title: 'Unholy',
    subtitle: 'Sam Smith & Kim Petras',
    images: { coverart: getPlaceholderImage('Unholy', 16) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'Sam Smith' }],
  },
  {
    key: '18',
    title: 'Anti-Hero',
    subtitle: 'Taylor Swift',
    images: { coverart: getPlaceholderImage('Anti-Hero', 17) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'Taylor Swift' }],
  },
  {
    key: '19',
    title: 'Calm Down',
    subtitle: 'Rema & Selena Gomez',
    images: { coverart: getPlaceholderImage('Calm Down', 18) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'Rema' }],
  },
  {
    key: '20',
    title: 'Creepin',
    subtitle: 'Metro Boomin, The Weeknd & 21 Savage',
    images: { coverart: getPlaceholderImage('Creepin', 19) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3' }] },
    genres: { primary: 'Hip-Hop' },
    artists: [{ alias: 'Metro Boomin' }],
  },
  {
    key: '21',
    title: 'Dynamite',
    subtitle: 'BTS',
    images: { coverart: getPlaceholderImage('Dynamite', 20) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-21.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'BTS' }],
  },
  {
    key: '22',
    title: 'Butter',
    subtitle: 'BTS',
    images: { coverart: getPlaceholderImage('Butter', 21) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-22.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'BTS' }],
  },
  {
    key: '23',
    title: 'Permission to Dance',
    subtitle: 'BTS',
    images: { coverart: getPlaceholderImage('Permission to Dance', 22) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-23.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'BTS' }],
  },
  {
    key: '24',
    title: 'Life Goes On',
    subtitle: 'BTS',
    images: { coverart: getPlaceholderImage('Life Goes On', 23) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-24.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'BTS' }],
  },
  {
    key: '25',
    title: 'Boy With Luv',
    subtitle: 'BTS feat. Halsey',
    images: { coverart: getPlaceholderImage('Boy With Luv', 24) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-25.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'BTS' }, { alias: 'Halsey' }],
  },
  {
    key: '26',
    title: 'Spring Day',
    subtitle: 'BTS',
    images: { coverart: getPlaceholderImage('Spring Day', 25) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-26.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'BTS' }],
  },
  {
    key: '27',
    title: 'Fake Love',
    subtitle: 'BTS',
    images: { coverart: getPlaceholderImage('Fake Love', 26) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-27.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'BTS' }],
  },
  {
    key: '28',
    title: 'DNA',
    subtitle: 'BTS',
    images: { coverart: getPlaceholderImage('DNA', 27) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-28.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'BTS' }],
  },
  {
    key: '29',
    title: 'IDOL',
    subtitle: 'BTS',
    images: { coverart: getPlaceholderImage('IDOL', 28) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-29.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'BTS' }],
  },
  {
    key: '30',
    title: 'Blood Sweat & Tears',
    subtitle: 'BTS',
    images: { coverart: getPlaceholderImage('Blood Sweat & Tears', 29) },
    hub: { actions: [{ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-30.mp3' }] },
    genres: { primary: 'Pop' },
    artists: [{ alias: 'BTS' }],
  },
]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchSongsAPI = async () => {
  await delay(1000) // Simulate network delay
  return { data: mockSongs }
}

export const fetchSongDetailsAPI = async (songId) => {
  await delay(500)
  const song = mockSongs.find(s => s.key === songId)
  if (!song) {
    throw new Error('Song not found')
  }
  return { data: song }
}

// For Shazam Core API integration (uncomment and add API key if needed)
/*
const shazamApi = axios.create({
  baseURL: 'https://shazam-core.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'YOUR_API_KEY',
    'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
  }
})

export const fetchSongsAPI = async () => {
  try {
    const response = await shazamApi.get('/v1/charts/world')
    return response
  } catch (error) {
    throw error
  }
}

export const fetchSongDetailsAPI = async (songId) => {
  try {
    const response = await shazamApi.get(`/v1/tracks/details?track_id=${songId}`)
    return response
  } catch (error) {
    throw error
  }
}
*/
