/**
 * Created by Daniel Schlaug on 2018-03-13.
 */


import 'bootstrap';
import SelectDish from "./SelectDish.jsx";
import React from "react";
import DishDetails from "./DishDetails.jsx";
import WelcomeView from "./Welcome.jsx";
import {getBestInformationOnSelectedDish, getMenuDishes, getSearchResults, getSearchType, getSearchText} from "../model/core";
import Menu from "./Menu.jsx";
import PrintDinner from "./PrintDinner";
import * as core from "../model/core";
import DinnerOverview from "./DinnerOverview.jsx";
import {pages} from "../model/Pages";
import NoConnection from "./NoConnection";

export default function AppComponent({
                                         state,
                                         filteredDishesFunc,
                                         dispatch,
                                     }) {
    const page = state.get('page');
    return <>
        <header key="header">
            <h1 className="appHeading"><a href="../../"> Dinner Planner</a></h1>
        </header>

        {state.get('connectivity') === 'offline' ? <NoConnection /> : ""}

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
                            currentSearchText={getSearchText(state)}
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
                        : <WelcomeView dispatch={dispatch}
                                       connectivity={state.get('connectivity')} />
        }
        <footer key="footer">Lab Group 5 - Daniel Schlaug & Siddhant Gupta</footer>
    </>;
}
