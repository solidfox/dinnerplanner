
import DishThumbnail from "../components/DishThumbnail.jsx";
import {ThumbnailHeading} from "../components/ThumbnailHeading.jsx";
import ReactDOM from "react-dom";
import React from "react";
import {navigateToPage} from "../Actions";
import {pages} from "../model/Pages";
import {getTotalMenuCost} from "../model/core";

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
        {menu.map(dish => <DishThumbnail title={dish.name} dishID={dish.id} imageURL={dish.body.image} cost={dish.body.price * nGuests} />)}
        </ul>
        <ThumbnailHeading header={nGuests + " People"} caption="Total cost: " subCaption={nGuests * menu.reduce((acc, dish) => acc + dish.body.price, 0)} />
        <button className="btn btn-warning selectButton" id="print_recipe"
                onClick={() => dispatch(navigateToPage(pages.printDinner))}>
            Print Full Recipe</button>
    </article>
    );
}

/*
class DinnerOverviewView extends View {


    setDishList(newList, nGuests) {
        this._dishList.innerHTML = "";
        newList.forEach(dish => {
            ReactDOM.render((<DishThumbnail title={dish.name} dishID={dish.id} imageURL={dish.image} cost={dish.price * nGuests} />), this._dishList);
            });
        if (this._totals) {
            this._dishList.appendChild(this._divider);
            this._dishList.appendChild(this._totals);
        }
    }

    setTotals(totalCost, nGuests) {
        if (this._totals) {
            this._divider.remove();
            this._totals.remove();
        }
        this._totals = <ThumbnailHeading header={nGuests + "People"} caption="Total cost" subCaption={totalCost} />;
        this._dishList.appendChild(this._divider);
        this._dishList.appendChild(this._totals);
    }

}
*/