// import Rx from '/node_modules/rxjs/Rx.js';
// import $ from 'jquery'
import {findDishes} from './model/network.js'
import ReactDOM from 'react-dom'
import React from "react"
import {reducer, initialState} from "./model/reducer"
import AppComponent from "./AppComponent.jsx"
import * as Redux from "redux"
import {getSideEffects, sideEffectMapper, SideEffector} from "./SideEffects"
import {navigateToPage} from "./Actions"
import {urlRouter} from "./model/Pages"
import * as Immutable from "immutable"
import * as json_immutable from "json-immutable"

const LOCAL_STORAGE_KEY = "dinnerPlannerState";

function persistState(state) {
    console.log(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, json_immutable.serialize(state));
}

function loadPersistedState() {
    try {
        return json_immutable.deserialize(localStorage.getItem(LOCAL_STORAGE_KEY));
    } catch (e) {}
    return null;
}

function main() {

    let persistedState = loadPersistedState() || undefined;
    console.log(persistedState);

    let store = Redux.createStore(
        reducer,
        loadPersistedState(),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    store.dispatch(navigateToPage(urlRouter(window.location)));

    let sideEffector = new SideEffector(sideEffectMapper, store.dispatch);

    let oldState = null;

    function render() {
        const state = store.getState();

        persistState(state);

        const sideEffects = getSideEffects(oldState, state);

        console.log("SideEffects: ");
        console.log(sideEffects.toJS());

        sideEffector.perform(sideEffects);

        ReactDOM.render(
            <AppComponent key="app"
                          state={state}
                          dispatch={store.dispatch}
                          filteredDishesFunc={findDishes}/>,
            appContainer);

        oldState = state;
    }

    const appContainer = document.getElementById("app-container");

    store.subscribe(render);

    render();
}

main();
