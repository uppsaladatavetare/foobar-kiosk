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
