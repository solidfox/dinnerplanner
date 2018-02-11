import {totalCostOfDish} from "../model/dinnerModel";
import {View} from "./view";

function createDishRow(document, dishName, dishCost) {
    let tableRow = document.createElement("tr");
    let dishNameCell = document.createElement("td");
    dishNameCell.textContent = dishName;
    let dishCostCell = document.createElement("td");
    dishCostCell.textContent = dishCost;
    dishCostCell.classList.add("currency");
    tableRow.appendChild(dishNameCell);
    tableRow.appendChild(dishCostCell);

    return tableRow;
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
export class WelcomeView extends View {

    constructor(containerElement, model) {
        super(containerElement);
        this._guestsElement = containerElement.querySelector("#numberOfGuests");

        this._dishesTable = containerElement.querySelector("#menuDishes");
        this._totalsElement = containerElement.querySelector("#menuTotals");

        this._plusButton = containerElement.querySelector("#plusGuest");
        this._minusButton = containerElement.querySelector("#minusGuest");

    }

    get locationHash() {
        return "";
    }

    get numberOfGuests() {
        return this._guestsElement.value;
    }

    set numberOfGuests(newValue) {
        this._guestsElement.value = newValue;
    }

    set menu(newMenu) {
        this._dishesTable.innerHTML = "";
        newMenu.forEach(dish => { this._dishesTable.appendChild(createDishRow(document, dish.name, totalCostOfDish(dish))) })
    }

    get menuTotals() {
        return this._totalsElement.textContent;
    }

    set menuTotals(newTotals) {
        this._totalsElement.textContent = newTotals;
    }

    update(model) {
        if (model) {
            this.numberOfGuests = model.nGuests();
            this.menu = model.getFullMenu();
            this.menuTotals = model.getTotalMenuPrice();
        }
    }

}
 
