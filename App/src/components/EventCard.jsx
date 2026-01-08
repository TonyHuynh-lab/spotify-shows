import { formatEventDate, formatVenueLocation, getEventStatus } from '../ticketmaster';
import './EventCard.css';

export default function EventCard({ event }) {
    const isAvailable = event.status === 'onsale';

    return (
        <div className="event-card fade-in">
            {event.imageUrl && (
                <div className="event-card-image-wrapper">
                    <img
                        src={event.imageUrl}
                        alt={event.name}
                        className="event-card-image"
                    />
                    <div className="event-card-overlay"></div>
                </div>
            )}

            <div className="event-card-content">
                <div className="event-header">
                    <h4 className="event-name">{event.name}</h4>
                    <span className={`event-status ${event.status}`}>
                        {getEventStatus(event.status)}
                    </span>
                </div>

                <div className="event-details">
                    <div className="event-detail">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="event-icon">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{formatEventDate(event.date)}</span>
                    </div>

                    <div className="event-detail">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="event-icon">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <div className="venue-info">
                            <span className="venue-name">{event.venue.name}</span>
                            <span className="venue-location">{formatVenueLocation(event.venue)}</span>
                        </div>
                    </div>
                </div>

                {event.priceRanges && event.priceRanges.length > 0 && (
                    <div className="event-price">
                        <span className="price-label">Price Range:</span>
                        <span className="price-value">
                            ${event.priceRanges[0].min} - ${event.priceRanges[0].max}
                        </span>
                    </div>
                )}

                <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-primary event-button ${!isAvailable ? 'btn-secondary' : ''}`}
                >
                    {isAvailable ? 'Get Tickets' : 'View Details'}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="button-icon">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </a>
            </div>
        </div>
    );
}
