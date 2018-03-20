import {totalCostOfDish} from "../model/network";
import {DishPrintView} from "../components/DishPrint.jsx";
import React from "react";
import {navigateToPage} from "../Actions";
import {pages} from "../model/Pages";


export default function PrintDinner({nGuests, menu, dispatch}) {
    return (
        <article className="no-menu" id="dinner-print-view">
            <header>
                <button className={'btn btn-warning selectButton'}
                        onClick={() => dispatch(navigateToPage(pages.selectDish))}>Go Back & Edit Dinner
                </button>
                <h1>Dinner for {nGuests} People</h1>
            </header>
            <main id='print-dish-list'>
                {menu.map(dish => <DishPrintView key={dish.id} dish={dish}/>)}
            </main>
        </article>
    )
}