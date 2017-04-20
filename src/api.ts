import * as fetch from "isomorphic-fetch";

const objectAssign = require("object-assign");

export function apiCall(endpoint: string, options?: any) {
    let apiHost = process.env.API.host;
    const apiKey = process.env.API.key;

    return fetch(`${apiHost}/api${endpoint}`, objectAssign({
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${apiKey}`
        }
    }, options));
}

export function thunderCall(endpoint: string, options?: any) {
    let apiHost = process.env.THUNDER.apiHost || process.env.THUNDER.host;
    const publicKey = process.env.THUNDER.key;
    const secretKey = process.env.THUNDER.secret;

    return fetch(`${apiHost}/api/1.0.0/${publicKey}${endpoint}`, objectAssign({
        headers: {
            "Accept": "application/json",
            //"Content-Type": "application/json",
            "X-Thunder-Secret-Key": secretKey
        }
    }, options));
}
