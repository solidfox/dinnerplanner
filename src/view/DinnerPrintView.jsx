import {totalCostOfDish} from "../model/dinnerModel";
import createDishPrintView from "../components/DishPrintView.jsx";
import ReactDOM from "react-dom";
import {DishPrintView} from "../components/DishPrintView.jsx";
import React from "react";
import {navigateToPage} from "../Actions";
import {pages} from "../model/Pages";


export default function PrintDinner({nGuests, menu, dispatch}) {
    return [
        <header>
            <button className={'btn btn-warning selectButton'}
                    onClick={() => dispatch(navigateToPage(pages.selectDish))}>Go Back & Edit Dinner
            </button>
            <h1>Dinner for {nGuests} People</h1>
        </header>,
        <main id='print-dish-list'>
            {menu.map(dish => <DishPrintView dish={dish}/>)}
        </main>
    ]
}