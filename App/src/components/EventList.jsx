import EventCard from './EventCard';
import './EventList.css';

export default function EventList({ events, loading, artistName }) {
    if (loading) {
        return (
            <div className="event-list-container">
                <div className="event-list-header">
                    <h2>Loading concerts...</h2>
                </div>
                <div className="loading-grid">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="event-skeleton pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (!events || events.length === 0) {
        return (
            <div className="event-list-container">
                <div className="event-list-header">
                    <h2>Upcoming Concerts</h2>
                </div>
                <div className="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="empty-icon">
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                        <path d="M17.5 9.5a3.5 3.5 0 0 0 -3.5 3.5h-4a3.5 3.5 0 0 0 -3.5 -3.5"></path>
                        <path d="M7 5v13a1 1 0 0 0 1 1h8a1 1 0 0 0 1 -1v-13a1 1 0 0 0 -1 -1h-8a1 1 0 0 0 -1 1z"></path>
                    </svg>
                    <h3>No Upcoming Concerts</h3>
                    <p>
                        {artistName
                            ? `No upcoming concerts found for ${artistName}.`
                            : 'Search for an artist to see their upcoming concerts.'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="event-list-container fade-in">
            <div className="event-list-header">
                <h2>Upcoming Concerts {artistName && `for ${artistName}`}</h2>
                <span className="event-count">{events.length} event{events.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="event-grid">
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}
