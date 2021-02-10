import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root";
import React from 'react';
require('dotenv').config()
//testing
//eot

document.addEventListener("DOMContentLoaded", () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    // window.dispatch = store.dispatch;
    // window.getState = store.getState;
    // window.fetchMoviesAPI = fetchMoviesAPI;

    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store} />, root);
});