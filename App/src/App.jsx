import { useState } from 'react';
import ArtistSearch from './components/ArtistSearch';
import ArtistCard from './components/ArtistCard';
import EventList from './components/EventList';
import TrackList from './components/TrackList';
import { searchArtists, getArtistTopTracks } from './spotify';
import { searchEvents } from './ticketmaster';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState({
    search: false,
    tracks: false,
    events: false,
  });
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(prev => ({ ...prev, search: true }));
    setError(null);

    try {
      const results = await searchArtists(query, 12);
      setSearchResults(results);

      // If no results, clear selected artist
      if (results.length === 0) {
        setSelectedArtist(null);
        setTopTracks([]);
        setEvents([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search artists. Please check your API credentials in config.js');
    } finally {
      setLoading(prev => ({ ...prev, search: false }));
    }
  };

  const handleArtistSelect = async (artist) => {
    setSelectedArtist(artist);
    setLoading(prev => ({ ...prev, tracks: true, events: true }));
    setError(null);

    // Scroll to events section
    setTimeout(() => {
      document.getElementById('artist-details')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);

    // Fetch top tracks
    try {
      const tracks = await getArtistTopTracks(artist.id);
      setTopTracks(tracks.slice(0, 10));
    } catch (err) {
      console.error('Error fetching tracks:', err);
      setTopTracks([]);
    } finally {
      setLoading(prev => ({ ...prev, tracks: false }));
    }

    // Fetch events
    try {
      const artistEvents = await searchEvents(artist.name);
      setEvents(artistEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setEvents([]);
    } finally {
      setLoading(prev => ({ ...prev, events: false }));
    }
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="currentColor" className="hero-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            <span>Powered by Spotify & Ticketmaster</span>
          </div>

          <h1 className="hero-title">
            Discover Live
            <span className="hero-title-accent"> Music</span>
          </h1>

          <p className="hero-subtitle">
            Search for your favorite artists and find their upcoming concerts near you
          </p>

          <div className="hero-search">
            <ArtistSearch onSearch={handleSearch} loading={loading.search} />
          </div>

          {error && (
            <div className="error-message">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="hero-gradient"></div>
      </section>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section className="search-results container">
          <h2 className="section-title">Artists</h2>
          <div className="artist-grid">
            {searchResults.map(artist => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onClick={handleArtistSelect}
                isSelected={selectedArtist?.id === artist.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* Artist Details */}
      {selectedArtist && (
        <section id="artist-details" className="artist-details">
          {/* Artist Header */}
          <div className="artist-header">
            <div className="artist-header-bg">
              {selectedArtist.images?.[0]?.url && (
                <img src={selectedArtist.images[0].url} alt={selectedArtist.name} />
              )}
              <div className="artist-header-overlay"></div>
            </div>

            <div className="artist-header-content container">
              <div className="artist-header-info">
                <span className="artist-label">Artist</span>
                <h1 className="artist-header-name">{selectedArtist.name}</h1>
                <div className="artist-header-stats">
                  {selectedArtist.genres?.slice(0, 3).map(genre => (
                    <span key={genre} className="genre-tag">{genre}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="container">
            <div className="content-section">
              <EventList
                events={events}
                loading={loading.events}
                artistName={selectedArtist.name}
              />
            </div>

            {/* Top Tracks */}
            {topTracks.length > 0 && (
              <div className="content-section">
                <TrackList tracks={topTracks} loading={loading.tracks} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            Built with
            <svg viewBox="0 0 24 24" fill="currentColor" className="heart-icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            using Spotify & Ticketmaster APIs
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
