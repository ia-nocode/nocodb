class TokenManager {
    constructor(token, expires) {
        this.token = token;
        this.expires = expires;
    }

    isValid() {
        return Date.now() < this.expires;
    }

    getApiKey() {
        const decoded = atob(this.token);
        return decoded.split('_')[0];
    }
}

async function fetchToken() {
    const response = await fetch('https://shrill-feather-ca7b.nocodb.workers.dev/');
    if (!response.ok) throw new Error('Failed to fetch token');
    return await response.json();
}

async function getAuthToken() {
    try {
        const { token, expires } = await fetchToken();
        const tokenManager = new TokenManager(token, expires);
        
        if (!tokenManager.isValid()) {
            throw new Error('Token expired');
        }

        return tokenManager.getApiKey();
    } catch (error) {
        console.error('Auth error:', error);
        throw new Error('Authorization failed');
    }
}
