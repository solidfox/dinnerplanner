/**
 * Created by Daniel Schlaug on 2018-03-13.
 */


import 'bootstrap';
import SelectDish from "./view/SelectDish.jsx";
import React from "react";
import DishDetails from "./view/DishDetails.jsx";
import WelcomeView from "./view/Welcome.jsx";
import {getBestInformationOnSelectedDish} from "./model/core";
import Menu from "./view/MenuView.jsx";
import PrintDinner from "./view/DinnerPrintView";
import * as core from "./model/core";

export default function AppComponent({
                                         state,
                                         filteredDishesFunc,
                                         dispatch,
                                     }) {
    function AppBody() {
        switch (state.get('page')) {
            case "select-dish":
                return [

                    <SelectDish dishTypes={state.get('dishTypes')}
                                dispatch={dispatch}
                                filteredDishesFunc={filteredDishesFunc}/>
                ];
            case "dish-details":
                return <DishDetails dish={core.getBestInformationOnSelectedDish(state)}
                                    nGuests={state.get("nGuests")}
                                    dispatch={dispatch}/>;
            case "dinner-overview":
                return <DinnerOverview/>;
            case "print-dinner":
                return <PrintDinner nGuests={state.get('nGuests')}
                                    menu={core.getMenuDishes(state)}
                                    dispatch={dispatch}/>;
            default:
                return <WelcomeView dispatch={dispatch}/>;
        }
    }

    return [
        <header key="header">
            <h1>Dinner Planner</h1>
        </header>,
        <AppBody key="body"/>,
        <footer key="footer">Lab Group 5 - Daniel Schlaug & Siddhant Gupta</footer>
    ];
}
