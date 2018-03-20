/**
 * Created by Daniel Schlaug on 2018-03-13.
 */


import 'bootstrap';
import SelectDish from "./view/SelectDish.jsx";
import React from "react";
import DishDetails from "./view/DishDetails.jsx";
import WelcomeView from "./view/Welcome.jsx";
import {getBestInformationOnSelectedDish, getMenuDishes, getSearchResults, getSearchType} from "./model/core";
import Menu from "./view/MenuView.jsx";
import PrintDinner from "./view/PrintDinner";
import * as core from "./model/core";
import DinnerOverview from "./view/DinnerOverviewView.jsx";
import {pages} from "./model/Pages";

export default function AppComponent({
                                         state,
                                         filteredDishesFunc,
                                         dispatch,
                                     }) {
    const page = state.get('page');
    return <>
        <header key="header">
            <h1>Dinner Planner</h1>
        </header>
        {
            page === pages.selectDish ||
            page === pages.dishDetails ? <Menu dispatch={dispatch}
                                               nGuests={state.get('nGuests')}
                                               totalCost={core.getTotalMenuCost(state)}
                                               menuDishes={core.getMenuDishes(state)}/>
                : null
        }
        {
            page === pages.selectDish ?
                <SelectDish dishTypes={state.get('dishTypes')}
                            dispatch={dispatch}
                            foundDishes={getSearchResults(state)}
                            currentSearchType={getSearchType(state)}
                //            filteredDishesFunc={filteredDishesFunc}
                />
                : page === pages.dishDetails ?
                <DishDetails dish={core.getBestInformationOnSelectedDish(state)}
                             nGuests={state.get("nGuests")}
                             dispatch={dispatch}/>
                : page === pages.dinnerOverview ?
                    <DinnerOverview nGuests={state.get('nGuests')}
                                    menu={core.getMenuDishes(state)}
                                    dispatch={dispatch}/>
                    : page === pages.printDinner ?
                        <PrintDinner nGuests={state.get('nGuests')}
                                     menu={core.getMenuDishes(state)}
                                     dispatch={dispatch}/>
                        : <WelcomeView dispatch={dispatch}/>
        }
        <footer key="footer">Lab Group 5 - Daniel Schlaug & Siddhant Gupta</footer>
    </>;
}
