// Cache for generated audio URLs
const audioUrlCache = {}

// Audio generator using Web Audio API
export const generateAudioBlob = (frequency = 440, duration = 30) => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const sampleRate = audioContext.sampleRate
    const numSamples = sampleRate * duration
    const buffer = audioContext.createBuffer(1, numSamples, sampleRate)
    const data = buffer.getChannelData(0)

    // Generate a simple tone with some variation
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate
      // Create a more musical tone with harmonics
      data[i] = Math.sin(2 * Math.PI * frequency * t) * 0.3 +
                Math.sin(2 * Math.PI * frequency * 2 * t) * 0.2 +
                Math.sin(2 * Math.PI * frequency * 3 * t) * 0.1
      // Add envelope to avoid clicks
      const envelope = Math.min(1, Math.min(t * 10, (duration - t) * 10))
      data[i] *= envelope
    }

    // Convert to WAV
    const wav = audioBufferToWav(buffer)
    const blob = new Blob([wav], { type: 'audio/wav' })
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error generating audio:', error)
    // Return a data URL as fallback
    return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGWi77+efTRAMUKfj8LZjHAY4kdfyzHksBSR3x/DdkEAKFF606euoVRQKRp/g8r5sIQUrgc7y2Yk2CBlou+/nn00QDFCn4/C2YxwGOJHX8sx5LAUkd8fw3ZBACg=='
  }
}

function audioBufferToWav(buffer) {
  const length = buffer.length
  const arrayBuffer = new ArrayBuffer(44 + length * 2)
  const view = new DataView(arrayBuffer)
  const channels = buffer.numberOfChannels
  let offset = 0
  let pos = 0

  // WAV header
  const setUint16 = (data) => {
    view.setUint16(pos, data, true)
    pos += 2
  }
  const setUint32 = (data) => {
    view.setUint32(pos, data, true)
    pos += 4
  }

  // RIFF identifier
  setUint32(0x46464952) // "RIFF"
  setUint32(36 + length * 2) // File length - 8
  setUint32(0x45564157) // "WAVE"
  setUint32(0x20746d66) // "fmt "
  setUint32(16) // Format chunk length
  setUint16(1) // Sample format (raw)
  setUint16(channels) // Channel count
  setUint32(buffer.sampleRate) // Sample rate
  setUint32(buffer.sampleRate * 2 * channels) // Byte rate
  setUint16(channels * 2) // Block align
  setUint16(16) // Bits per sample
  setUint32(0x61746164) // "data"
  setUint32(length * 2) // Data chunk length

  // Convert float samples to 16-bit PCM
  const data = buffer.getChannelData(0)
  for (let i = 0; i < length; i++) {
    const s = Math.max(-1, Math.min(1, data[i]))
    view.setInt16(pos, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
    pos += 2
  }

  return arrayBuffer
}

// Generate different frequencies for different songs
export const getSongAudioUrl = (songKey) => {
  // Cache the URL to avoid regenerating
  if (audioUrlCache[songKey]) {
    return audioUrlCache[songKey]
  }
  
  // Map each song to a different frequency for variety
  const frequencies = {
    '1': 440, '2': 494, '3': 523, '4': 554, '5': 587,
    '6': 659, '7': 698, '8': 740, '9': 784, '10': 831,
    '11': 880, '12': 932, '13': 988, '14': 1047, '15': 1109,
    '16': 1175, '17': 1245, '18': 1319, '19': 1397, '20': 1480,
    '21': 1568, '22': 1661, '23': 1760, '24': 1865, '25': 1976,
    '26': 2093, '27': 2217, '28': 2349, '29': 2489, '30': 2637
  }
  const freq = frequencies[songKey] || 440
  const url = generateAudioBlob(freq, 30) // 30 second audio
  audioUrlCache[songKey] = url
  return url
}
