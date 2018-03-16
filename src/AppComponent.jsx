/**
 * Created by Daniel Schlaug on 2018-03-13.
 */


import 'bootstrap';
import SelectDish from "./view/SelectDish.jsx";
import React from "react";
import DishDetails from "./view/DishDetails.jsx";

export default function AppComponent({
                                         page,
                                         selectedDish,
                                         searchString,
                                         menu,
                                         dishTypes,
                                         filteredDishesFunc,
                                         dispatch,
                                     }) {
    function AppBody() {
        switch (page) {
            case "":
                return <WelcomeView/>;
            case "select-dish":
                return <SelectDish dishTypes={dishTypes} dispatch={dispatch}
                                   filteredDishesFunc={filteredDishesFunc}/>;
            case "dish-details":
                return <DishDetails dish={selectedDish}
                                    dispatch={dispatch}/>;
            case "dinner-overview":
                return <DinnerOverview/>;
        }
    }

    return [
        <header key="header">
            <h1>Dinner Planner</h1>
        </header>,
        <AppBody key="body"/>,
        <footer key="footer">Lab Group 5</footer>
    ];
}