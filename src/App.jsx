// import Rx from '/node_modules/rxjs/Rx.js';
// import $ from 'jquery'
import DinnerModel from './model/dinnerModel.js'
import SelectDish from "./view/SelectDish.jsx";
import 'bootstrap';
import ReactDOM from 'react-dom';
import React from "react";
import {store} from "./model/store";

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


    const appContainer = getNode("app-container");

    ReactDOM.render(<AppComponent dispatch={store.dispatch}
                                  page="select-dish"
                                  filteredDishesFunc={model.filteredDishes}
                                  dishTypes={model.dishTypes} />, appContainer);

}

function AppComponent({
                          page,
                          dish,
                          dispatch,
                          dishTypes,
                          filteredDishesFunc,
                      }) {
    function body(page) {
        switch (page) {
            case "":
                return <WelcomeView/>;
            case "select-dish":
                return [<SelectDish dishTypes={dishTypes} dispatch={dispatch} filteredDishesFunc={filteredDishesFunc}/>];
            case "dish-details":
                return <DishDetails dish={undefined}/>;
            case "dinner-overview":
                return <DinnerOverview/>;
        }
    }
    return [
        <header>
            <h1>Dinner Planner</h1>
        </header>,
        body(page),
        <footer>Lab Group 5</footer>
    ];
}

main();
