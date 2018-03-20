import DishThumbnail from "../components/DishThumbnail.jsx";
import {ThumbnailHeading} from "../components/ThumbnailHeading.jsx";
import React from "react";
import {navigateToPage} from "../Actions";
import {pages} from "../model/Pages";
<<<<<<< Updated upstream

export default function DinnerOverview({nGuests, menu, dispatch}) {
    return (
        <article className="no-menu" id="dinner-overview-view">
            <header>
                <button className="btn btn-warning selectButton"
                        onClick={() => dispatch(navigateToPage(pages.selectDish))}>
                    Go Back & Edit Dinner
                </button>
                <h1>Dinner Overview</h1>
            </header>
            <ul className="dish-thumbnail-list">
                {menu.map(dish => <DishThumbnail title={dish.name}
                                                 key={dish.id}
                                                 dishID={dish.id}
                                                 imageURL={dish.body.image}
                                                 cost={dish.body.price * nGuests}/>)}
                <ThumbnailHeading header={nGuests + " People"} caption="Total cost: "
                                  subCaption={nGuests * menu.reduce((acc, dish) => acc + dish.body.price, 0)}/>
            </ul>
            <button className="btn btn-warning selectButton" id="print_recipe"
                    onClick={() => dispatch(navigateToPage(pages.printDinner))}>
                Print Full Recipe
            </button>
        </article>
    );
}
=======
import {getTotalMenuCost, round} from "../model/core";

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
        {menu.map(dish => <DishThumbnail title={dish.name} dishID={dish.id} imageURL={dish.body.image} />)}
        </ul>
        <ThumbnailHeading header={nGuests + " People"} caption="Total cost: " subCaption={round(nGuests * menu.reduce((acc, dish) => acc + dish.body.price, 0))} />
        <button className="btn btn-warning selectButton" id="print_recipe"
                onClick={() => dispatch(navigateToPage(pages.printDinner))}>
            Print Full Recipe</button>
    </article>
    );
}
>>>>>>> Stashed changes
