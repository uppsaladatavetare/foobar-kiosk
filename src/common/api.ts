import * as fetch from "isomorphic-fetch";

export function apiCall(endpoint: string, options?: object) {
    const apiHost = config.API.host;
    const apiKey = config.API.key;

    return fetch(`${apiHost}/api${endpoint}`, Object.assign({
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${apiKey}`
        }
    }, options));
}

export function thunderCall(endpoint: string, options?: object) {
    const apiHost = config.THUNDER.host;
    const publicKey = config.THUNDER.key;
    const secretKey = config.THUNDER.secret;

    return fetch(`${apiHost}/api/1.0.0/${publicKey}${endpoint}`, Object.assign({
        headers: {
            "Accept": "application/json",
            // "Content-Type": "application/json",
            "X-Thunder-Secret-Key": secretKey
        }
    }, options));
}
