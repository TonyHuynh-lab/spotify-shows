import { useState } from 'react';
import './ArtistSearch.css';

export default function ArtistSearch({ onSearch, loading }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="artist-search">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-input-wrapper">
                    <svg
                        className="search-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Search for an artist..."
                        className="search-input"
                        disabled={loading}
                    />
                    {loading && <div className="loading search-loading"></div>}
                </div>
                <button
                    type="submit"
                    className="btn-primary search-button"
                    disabled={loading || !query.trim()}
                >
                    Search
                </button>
            </form>
        </div>
    );
}
