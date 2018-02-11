import {totalCostOfDish} from "../model/dinnerModel";
import {View} from "./view";
import {createDishPrintView} from "./dishPrintView";

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
export class DinnerPrintView extends View {

    constructor(containerElement, model) {
        super(containerElement);
        this._dishList = containerElement.querySelector("#print-dish-list");
        this.update(model);
    }

    get locationHash() {
        return "#print-dinner";
    }

    set dishList(newList) {
        this._dishList.innerHTML = "";
        newList.forEach(dish => {
            this._dishList.appendChild(createDishPrintView(document, dish));
        });
    }

    update(model) {
        this.dishList = model.selectedDishes;
    }

}
 
