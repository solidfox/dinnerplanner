// import Rx from '/node_modules/rxjs/Rx.js';
// import $ from 'jquery'
import {fetchDish, filteredDishes} from './model/network.js'
import ReactDOM from 'react-dom';
import React from "react";
import {reducer, initialState} from "./model/reducer";
import AppComponent from "./AppComponent.jsx";
import * as Redux from "redux";
import {renderSideEffects, sideEffectMapper, SideEffector} from "./SideEffects";
import * as core from "./model/core";
import {navigateToPage} from "./Actions";
import {urlRouter} from "./model/Pages";

function main() {
    // And create the instance of ExampleView
    // let exampleView = new ExampleView($("#exampleView"));

    let store = Redux.createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    store.dispatch(navigateToPage(urlRouter(window.location)));

    let sideEffector = new SideEffector(sideEffectMapper, store.dispatch);

    function render() {
        const state = store.getState();

        const sideEffects = renderSideEffects(state);

        console.log("SideEffects: ");
        console.log(sideEffects.toJS());

        sideEffector.perform(sideEffects);

        ReactDOM.render(
            <AppComponent key="app"
                          state={state}
                          dispatch={store.dispatch}
                          filteredDishesFunc={filteredDishes}/>,
            appContainer);

    }

    const appContainer = document.getElementById("app-container");

    store.subscribe(render);

    render();
}

main();
