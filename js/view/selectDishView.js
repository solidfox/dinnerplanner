import {totalCostOfDish} from "../model/dinnerModel";
import {View} from "./view";

function createDishThumbnail(document, dishName, imageURL) {
    let dishImageElement = document.createElement("img");
    dishImageElement.src = imageURL;

    let dishTitleElement = document.createElement("div");
    dishTitleElement.textContent = dishName;

    let anchor = document.createElement("a");
    anchor.href = "#dish-details";
    anchor.appendChild(dishImageElement);
    anchor.appendChild(dishTitleElement);

    let liElement = document.createElement("li");
    liElement.classList.add('dish');
    liElement.appendChild(anchor);

    return liElement;
}

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
            console.log(dish);
            this._dishList.appendChild(createDishThumbnail(document, dish.name, 'images/' + dish.image))
        });
    }

    update(model) {
        if (model) {
            console.log(model.dishes);
            this.dishList = model.getAllDishes();
        }
    }

}
 
