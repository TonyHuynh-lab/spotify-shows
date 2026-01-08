import { formatDuration } from '../spotify';
import './TrackList.css';

export default function TrackList({ tracks, loading }) {
    if (loading) {
        return (
            <div className="track-list-container">
                <h3>Top Tracks</h3>
                <div className="track-loading">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="track-skeleton pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (!tracks || tracks.length === 0) {
        return null;
    }

    return (
        <div className="track-list-container fade-in">
            <h3>Top Tracks</h3>
            <div className="track-list">
                {tracks.map((track, index) => (
                    <div key={track.id} className="track-item">
                        <span className="track-number">{index + 1}</span>

                        {track.album?.images?.[2]?.url && (
                            <img
                                src={track.album.images[2].url}
                                alt={track.album.name}
                                className="track-album-image"
                            />
                        )}

                        <div className="track-info">
                            <span className="track-name">{track.name}</span>
                            <span className="track-album">{track.album?.name}</span>
                        </div>

                        <span className="track-duration">
                            {formatDuration(track.duration_ms)}
                        </span>

                        {track.preview_url && (
                            <a
                                href={track.preview_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="track-preview"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </a>
                        )}

                        {track.external_urls?.spotify && (
                            <a
                                href={track.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="track-spotify-link"
                                title="Open in Spotify"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 14.5c-.17.3-.52.4-.83.23-2.27-1.4-5.13-1.71-8.5-.93-.34.08-.68-.13-.76-.47-.08-.34.13-.68.47-.76 3.69-.86 6.93-.49 9.4 1.1.31.17.41.53.23.83zm1.18-2.62c-.21.38-.66.5-1.04.28-2.6-1.6-6.56-2.06-9.64-1.13-.41.12-.84-.12-.96-.53-.12-.41.12-.84.53-.96 3.54-1.07 7.96-.55 10.83 1.3.38.22.51.67.28 1.04zm.1-2.73C14.77 9.07 10.49 8.85 7.35 9.73c-.5.14-1.03-.15-1.17-.65-.14-.5.15-1.03.65-1.17 3.58-1 8.39-.72 11.96 1.3.46.26.62.86.35 1.32-.26.47-.86.62-1.32.35z" />
                                </svg>
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
