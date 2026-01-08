# Artist Concerts Landing Page

A page for discovering artist concerts using Spotify and Ticketmaster APIs.

## Features

- **Modern Design** - Spotify-inspired dark theme with smooth animations
- **Artist Search** - Find your favorite artists using Spotify API
- **Concert Listings** - View upcoming events from Ticketmaster
- **Top Tracks** - Listen to artist's most popular songs
- **Responsive** - Works beautifully on all devices
- **Smooth Animations** - Premium micro-interactions and transitions

## Setup

### Prerequisites

- Node.js installed
- Spotify Developer Account
- Ticketmaster Developer Account

### 1. Install Dependencies

```bash
cd App
npm install
```

### 2. Get API Credentials

**Spotify API:**
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create an app
3. Copy your **Client ID** and **Client Secret**

**Ticketmaster API:**
1. Register at [Ticketmaster Developer Portal](https://developer.ticketmaster.com/)
2. Get your **API Key** (free tier available)

### 3. Configure API Keys

Open `src/config.js` and replace the placeholder values:

```javascript
export const SPOTIFY_CONFIG = {
  CLIENT_ID: 'YOUR_SPOTIFY_CLIENT_ID',
  CLIENT_SECRET: 'YOUR_SPOTIFY_CLIENT_SECRET',
  // ... rest stays the same
};

export const TICKETMASTER_CONFIG = {
  API_KEY: 'YOUR_TICKETMASTER_API_KEY',
  // ... rest stays the same
};
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. **Search for an Artist** - Type an artist name in the search bar
2. **Select Artist** - Click on an artist card to view details
3. **View Concerts** - Browse upcoming concerts and events
4. **Get Tickets** - Click "Get Tickets" to purchase on Ticketmaster
5. **Listen to Tracks** - Check out the artist's top tracks

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Spotify API** - Artist data and tracks
- **Ticketmaster API** - Concert events
- **CSS3** - Modern styling with animations

## Project Structure

```
App/
├── src/
│   ├── components/       # React components
│   ├── config.js        # API configuration
│   ├── spotify.js       # Spotify API integration
│   ├── ticketmaster.js  # Ticketmaster API integration
│   ├── App.jsx          # Main application
│   └── index.css        # Global styles
└── package.json
``

## License

MIT

## Credits

- Design inspired by [Spotify](https://spotify.com)
- Data from [Spotify API](https://developer.spotify.com/) and [Ticketmaster API](https://developer.ticketmaster.com/)
