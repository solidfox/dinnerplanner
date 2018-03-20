import DishThumbnail from "./DishThumbnail.jsx"
import React from "react"
import {navigateToPage} from "../model/Actions"
import {pages} from "../model/Pages"
import {round} from "../model/core"

export default function DinnerOverview ({nGuests, menu, dispatch}) {
    return(
    <article className="no-menu" id="dinner-overview-view" >
        <header>
            <button className="btn btn-warning selectButton"
                    onClick={() => dispatch(navigateToPage(pages.selectDish))}>
                Go Back & Edit Dinner </button>
            <h1>Dinner Overview</h1>
        </header>
        <ul className="dish-thumbnail-list">
        {menu.map(dish => <DishThumbnail key={dish.id}
                                         title={dish.name}
                                         dishID={dish.id}
                                         cost={round(dish.body.price)}
                                         imageURL={dish.body.image} />)}
        </ul>
        <br />
        <h3>Total Cost for {nGuests} people = ${round(nGuests * menu.reduce((acc, dish) => acc + dish.body.price, 0))}</h3>
            <button className="btn btn-primary btn-lg selectButton" id="print_recipe"
                onClick={() => dispatch(navigateToPage(pages.printDinner))}>
            Print Full Recipe</button>
    </article>
    );
}

//<ThumbnailHeading header={nGuests + " People"} caption="Total cost: " subCaption={round(nGuests * menu.reduce((acc, dish) => acc + dish.body.price, 0))} />
