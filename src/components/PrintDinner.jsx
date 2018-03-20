import React from "react";
import {navigateToPage} from "../model/Actions";
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
                {menu.map(dish =>
                    <React.Fragment key={dish.id}>
                        <img className="dish" src={dish.body.image}/>
                        <h2 className="capitaliseLabel"> {dish.name} </h2>
                        <p>{dish.body.description}</p>
                    </React.Fragment>)}
            </main>
        </article>
    )
}