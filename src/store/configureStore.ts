declare var module: { hot: any };

import Raven = require("raven-js");
var createRavenMiddleware = require("raven-for-redux");

import thunkMiddleware from "redux-thunk";
import * as createLogger from "redux-logger";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "reducers";
import { thunderCall } from "api";

if (process.env.SENTRY) {
    Raven.config(process.env.SENTRY).install();
}

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    createLogger(),
    createRavenMiddleware(Raven)
)(createStore);

export default function configureStore(initialState: any = {}) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("reducers", () => {
            const nextRootReducer = require("reducers");
            store.replaceReducer(nextRootReducer);
        });
    }

    if (process.env.SCREEN === 'primary') {
        store.subscribe(() => {
            thunderCall('/channels/state/', {
                method: "post",
                body: JSON.stringify({
                    'state': store.getState()
                })
            });
        });
    }

    return store;
}
