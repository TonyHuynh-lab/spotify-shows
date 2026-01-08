import { formatFollowers } from '../spotify';
import './ArtistCard.css';

export default function ArtistCard({ artist, onClick, isSelected }) {
    const image = artist.images?.[0]?.url || artist.images?.[1]?.url;
    const genres = artist.genres?.slice(0, 3).join(', ') || 'Various Genres';

    return (
        <div
            className={`artist-card ${isSelected ? 'selected' : ''} fade-in`}
            onClick={() => onClick(artist)}
        >
            <div className="artist-card-image-wrapper">
                {image ? (
                    <img
                        src={image}
                        alt={artist.name}
                        className="artist-card-image"
                    />
                ) : (
                    <div className="artist-card-placeholder">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                    </div>
                )}
                <div className="artist-card-overlay"></div>
            </div>

            <div className="artist-card-content">
                <h3 className="artist-card-name">{artist.name}</h3>
                <p className="artist-card-genres">{genres}</p>

                <div className="artist-card-stats">
                    <div className="artist-stat">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="stat-icon">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                        </svg>
                        <span>{formatFollowers(artist.followers?.total || 0)} followers</span>
                    </div>

                    {artist.popularity && (
                        <div className="artist-stat">
                            <div className="popularity-bar">
                                <div
                                    className="popularity-fill"
                                    style={{ width: `${artist.popularity}%` }}
                                ></div>
                            </div>
                            <span>{artist.popularity}% popular</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
