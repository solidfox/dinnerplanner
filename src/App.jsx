// import Rx from '/node_modules/rxjs/Rx.js';
// import $ from 'jquery'
import DinnerModel from './model/dinnerModel.js'
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
    //We instantiate our model
    let model = new DinnerModel();

    model.selectedDishesObservable.subscribe(function onNext(selectedDishes) {
        console.log("Selected dishes changed.");
    });

    // And create the instance of ExampleView
    // let exampleView = new ExampleView($("#exampleView"));

    function getNode(id) {
        return document.getElementById(id);
    }

    //
    // let menuView = new MenuView(getNode('menu-view'), model);
    // let menuController = new MenuController(menuView, model);
    // let welcomeView = new WelcomeView(getNode('welcome-view'), model);
    // let dishDetailsView = new DishDetailsView(getNode('dish-details-view'), model);
    // let dishDetailsViewController = new DishDetailsController(dishDetailsView, model);
    // let dinnerOverviewView = new DinnerOverviewView(getNode('dinner-overview-view'), model);
    // let dinnerPrintView = new DinnerPrintView(getNode('dinner-print-view'), model);
    //
    // let allViews = [menuView, welcomeView, dishDetailsView, dinnerOverviewView, dinnerPrintView];
    //
    // function route(location) {
    //     function deactivateAllBut(viewsToActivate) {
    //         allViews.forEach(view => {
    //             view.active = viewsToActivate.includes(view);
    //         })
    //     }
    //
    //     switch (location.hash.split('@')[0]) {
    //         case selectDishView.locationHash:
    //             deactivateAllBut([menuView]);
    //             break;
    //         case dishDetailsView.locationHash:
    //             deactivateAllBut([menuView, dishDetailsView]);
    //             break;
    //         case dinnerOverviewView.locationHash:
    //             deactivateAllBut([dinnerOverviewView]);
    //             break;
    //         case dinnerPrintView.locationHash:
    //             deactivateAllBut([dinnerPrintView]);
    //             break;
    //         default:
    //             deactivateAllBut([welcomeView]);
    //     }
    // }
    //
    // function onLocationHashChange() {
    //     route(window.location);
    // }
    //
    // window.addEventListener('hashchange', onLocationHashChange, false);
    //
    // route(window.location);

    let store = Redux.createStore(reducer);

    store.dispatch(navigateToPage("select-dish"));

    let sideEffector = new SideEffector(sideEffectMapper, store.dispatch);

    function render() {
        const state = store.getState();

        console.log("State: ");
        console.log(state.toJS());

        const sideEffects = renderSideEffects(state);

        console.log("SideEffects: ");
        console.log(sideEffects.toJS());

        sideEffector.perform(sideEffects);

        ReactDOM.render(
            <AppComponent state={state.toJS()}
                          dispatch={store.dispatch}
                          selectedDish={core.getFullDataOnSelectedDish(state) || state.get('selectedDish') && state.get('selectedDish').toJS()}
                          filteredDishesFunc={model.filteredDishes}/>,
            appContainer);

    }

    const appContainer = getNode("app-container");

    store.subscribe(render);

    render();
}

main();
