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
    }

    get locationHash() {
        return "";
    }

}
 
