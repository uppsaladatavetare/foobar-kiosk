import fetch from 'isomorphic-fetch';

export function apiCall(endpoint, options) {
    var apiHost = ENV.api.host;
    var apiKey = ENV.api.key;

    return fetch(`${apiHost}/api${endpoint}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${apiKey}`
        },
        ...options
    });
}
