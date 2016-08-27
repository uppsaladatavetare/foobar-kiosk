declare var module: { hot: any };

import thunkMiddleware from "redux-thunk";
import * as createLogger from "redux-logger";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "reducers";

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    createLogger()
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

    return store;
}
