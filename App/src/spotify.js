import { SPOTIFY_CONFIG } from './config.js';

// Token cache
let accessToken = null;
let tokenExpiration = null;

/**
 * Get Spotify access token using Client Credentials flow
 */
async function getAccessToken() {
    // Return cached token if still valid
    if (accessToken && tokenExpiration && Date.now() < tokenExpiration) {
        return accessToken;
    }

    try {
        const response = await fetch(SPOTIFY_CONFIG.AUTH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`),
            },
            body: 'grant_type=client_credentials',
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate with Spotify');
        }

        const data = await response.json();
        accessToken = data.access_token;
        // Set expiration to 5 minutes before actual expiration
        tokenExpiration = Date.now() + (data.expires_in - 300) * 1000;

        return accessToken;
    } catch (error) {
        console.error('Spotify authentication error:', error);
        throw error;
    }
}

/**
 * Make authenticated request to Spotify API
 */
async function spotifyRequest(endpoint) {
    const token = await getAccessToken();

    const response = await fetch(`${SPOTIFY_CONFIG.BASE_URL}${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status}`);
    }

    return response.json();
}

/**
 * Search for artists
 * @param {string} query - Search query
 * @param {number} limit - Number of results (default: 10)
 */
export async function searchArtists(query, limit = 10) {
    if (!query || query.trim() === '') {
        return [];
    }

    try {
        const encodedQuery = encodeURIComponent(query);
        const data = await spotifyRequest(`/search?q=${encodedQuery}&type=artist&limit=${limit}`);
        return data.artists.items;
    } catch (error) {
        console.error('Error searching artists:', error);
        throw error;
    }
}

/**
 * Get artist details by ID
 * @param {string} artistId - Spotify artist ID
 */
export async function getArtist(artistId) {
    try {
        return await spotifyRequest(`/artists/${artistId}`);
    } catch (error) {
        console.error('Error getting artist:', error);
        throw error;
    }
}

/**
 * Get artist's top tracks
 * @param {string} artistId - Spotify artist ID
 * @param {string} market - Market code (default: 'US')
 */
export async function getArtistTopTracks(artistId, market = 'US') {
    try {
        const data = await spotifyRequest(`/artists/${artistId}/top-tracks?market=${market}`);
        return data.tracks;
    } catch (error) {
        console.error('Error getting top tracks:', error);
        throw error;
    }
}

/**
 * Get artist's albums
 * @param {string} artistId - Spotify artist ID
 * @param {number} limit - Number of albums (default: 10)
 */
export async function getArtistAlbums(artistId, limit = 10) {
    try {
        const data = await spotifyRequest(`/artists/${artistId}/albums?limit=${limit}&include_groups=album,single`);
        return data.items;
    } catch (error) {
        console.error('Error getting albums:', error);
        throw error;
    }
}

/**
 * Get related artists
 * @param {string} artistId - Spotify artist ID
 */
export async function getRelatedArtists(artistId) {
    try {
        const data = await spotifyRequest(`/artists/${artistId}/related-artists`);
        return data.artists.slice(0, 6); // Return top 6 related artists
    } catch (error) {
        console.error('Error getting related artists:', error);
        throw error;
    }
}

/**
 * Format follower count for display
 * @param {number} count - Follower count
 */
export function formatFollowers(count) {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
}

/**
 * Format track duration (ms to mm:ss)
 * @param {number} durationMs - Duration in milliseconds
 */
export function formatDuration(durationMs) {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
