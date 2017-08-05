declare const module: { hot: any };

import * as Raven from "raven-js";
const createRavenMiddleware = require("raven-for-redux");

import thunkMiddleware from "redux-thunk";
import * as createLogger from "redux-logger";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "reducers";
import { thunderCall } from "api";

if (config.SENTRY) {
    Raven.config(config.SENTRY).install();
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

    if (config.SCREEN === 'primary') {
        store.subscribe(() => {
            thunderCall('/channels/state/', {
                method: "post",
                body: JSON.stringify({
                    state: store.getState()
                })
            });
        });
    }

    return store;
}
