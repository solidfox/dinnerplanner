import {totalCostOfDish} from "../model/dinnerModel";
import {View} from "./view";
import {createDishThumbnail} from "../components/dishThumbnail";

/** MenuView Object constructor
 *
 * This object represents the code for one specific view (in this case the Example view).
 *
 * It is responsible for:
 * - constructing the view (e.g. if you need to create some HTML elements procedurally)
 * - populating the view with the data
 * - updating the view when the data changes
 *
 * You should create a view Object like this for every view in your UI.
 *
 * @param {jQuery object} container - references the HTML parent element that contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
export class SelectDishView extends View {

    constructor(containerElement, model) {
        super(containerElement);
        this._dishList = containerElement.querySelector("#select-dish-list");

        this._dishesTable = containerElement.querySelector("#menuDishes");
        this._totalsElement = containerElement.querySelector("#menuTotals");

        this._plusButton = containerElement.querySelector("#plusGuest");
        this._minusButton = containerElement.querySelector("#minusGuest");

        this.update(model);
    }

    get locationHash() {
        return "#select-dish";
    }

    set dishList(newList) {
        this._dishList.innerHTML = "";
        newList.forEach(dish => {
            this._dishList.appendChild(createDishThumbnail({document: document, title:dish.name, dishID:dish.id, imageURL:'images/' + dish.image}))
        });
    }

    update(model) {
        if (model) {
            console.log(model.dishes);
            this.dishList = model.dishes;
        }
    }

}
 
