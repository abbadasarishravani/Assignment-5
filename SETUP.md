# Quick Setup Guide

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## Features Implemented

✅ Responsive UI with SongCard, Sidebar, and TopPlay components
✅ Redux Toolkit for state management
✅ Mock API integration (easily switchable to Shazam Core)
✅ Genre filtering functionality
✅ Song details page with routing
✅ Full playback UI with controls
✅ Error handling and loading states
✅ Theme toggle (dark/light mode)

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components (Discover, SongDetails)
- `src/store/` - Redux store and slices
- `src/services/` - API services
- `src/assets/` - Constants and static assets

## Notes

- The app uses mock data by default. To use Shazam Core API, uncomment the code in `src/services/api.js` and add your API key.
- Theme preference is saved to localStorage.
- All components are fully responsive and support both dark and light themes.
