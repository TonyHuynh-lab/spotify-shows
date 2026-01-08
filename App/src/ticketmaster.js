import { TICKETMASTER_CONFIG } from './config.js';

/**
 * Search for events by artist name
 * @param {string} artistName - Artist name to search for
 * @param {number} size - Number of results (default: 20)
 */
export async function searchEvents(artistName, size = 20) {
    if (!artistName || artistName.trim() === '') {
        return [];
    }

    try {
        const encodedArtist = encodeURIComponent(artistName);
        const url = `${TICKETMASTER_CONFIG.BASE_URL}/events.json?apikey=${TICKETMASTER_CONFIG.API_KEY}&keyword=${encodedArtist}&classificationName=Music&sort=date,asc&size=${size}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ticketmaster API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data._embedded || !data._embedded.events) {
            return [];
        }

        return data._embedded.events.map(formatEvent);
    } catch (error) {
        console.error('Error searching events:', error);
        return []; // Return empty array on error instead of throwing
    }
}

/**
 * Format event data for easier consumption
 */
function formatEvent(event) {
    const venue = event._embedded?.venues?.[0];
    const date = event.dates?.start;
    const images = event.images || [];

    // Find best quality image
    const primaryImage = images.find(img => img.ratio === '16_9' && img.width > 1000)
        || images.find(img => img.ratio === '16_9')
        || images[0];

    return {
        id: event.id,
        name: event.name,
        url: event.url,
        date: {
            localDate: date?.localDate,
            localTime: date?.localTime,
            timezone: date?.timezone,
            dateTime: date?.dateTime,
        },
        venue: {
            name: venue?.name || 'Venue TBA',
            city: venue?.city?.name || '',
            state: venue?.state?.stateCode || '',
            country: venue?.country?.countryCode || '',
            address: venue?.address?.line1 || '',
        },
        priceRanges: event.priceRanges || [],
        ticketLimit: event.ticketLimit,
        status: event.dates?.status?.code || 'onsale',
        imageUrl: primaryImage?.url || '',
        info: event.info || '',
        pleaseNote: event.pleaseNote || '',
    };
}

/**
 * Format event date for display
 * @param {object} date - Event date object
 */
export function formatEventDate(date) {
    if (!date.localDate) return 'Date TBA';

    const eventDate = new Date(date.localDate);
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    let formatted = eventDate.toLocaleDateString('en-US', options);

    if (date.localTime) {
        formatted += ` at ${formatTime(date.localTime)}`;
    }

    return formatted;
}

/**
 * Format time from 24h to 12h format
 * @param {string} time - Time in HH:MM:SS format
 */
function formatTime(time) {
    if (!time) return '';

    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minutes} ${ampm}`;
}

/**
 * Format venue location
 * @param {object} venue - Venue object
 */
export function formatVenueLocation(venue) {
    const parts = [];

    if (venue.city) parts.push(venue.city);
    if (venue.state) parts.push(venue.state);
    if (venue.country && venue.country !== 'US') parts.push(venue.country);

    return parts.join(', ') || 'Location TBA';
}

/**
 * Format price range for display
 * @param {array} priceRanges - Array of price range objects
 */
export function formatPriceRange(priceRanges) {
    if (!priceRanges || priceRanges.length === 0) {
        return 'Price TBA';
    }

    const { min, max, currency = 'USD' } = priceRanges[0];
    const symbol = currency === 'USD' ? '$' : currency;

    if (min === max) {
        return `${symbol}${min}`;
    }

    return `${symbol}${min} - ${symbol}${max}`;
}

/**
 * Get event status text
 * @param {string} statusCode - Event status code
 */
export function getEventStatus(statusCode) {
    const statusMap = {
        'onsale': 'On Sale',
        'offsale': 'Off Sale',
        'cancelled': 'Cancelled',
        'postponed': 'Postponed',
        'rescheduled': 'Rescheduled',
    };

    return statusMap[statusCode?.toLowerCase()] || 'Check Website';
}

/**
 * Check if event is upcoming (within next 6 months)
 * @param {object} date - Event date object
 */
export function isUpcoming(date) {
    if (!date.localDate) return false;

    const eventDate = new Date(date.localDate);
    const now = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(now.getMonth() + 6);

    return eventDate >= now && eventDate <= sixMonthsFromNow;
}
