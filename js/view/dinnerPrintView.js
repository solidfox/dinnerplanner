import {totalCostOfDish} from "../model/dinnerModel";
import {View} from "./view";
import createDishPrintView from "../components/dishPrintView";

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
        model.selectedDishesObservable.subscribe(selectedDishes => this.dishList = selectedDishes);
    }

    get locationHash() {
        return "#print-dinner";
    }

    set dishList(newList) {
        this._dishList.innerHTML = "";
        newList.forEach(dish => {
            let elements = createDishPrintView(document, dish);
            elements.forEach(element => this._dishList.appendChild(element));
        });
    }

}
 //dummy function
function createPrintView ({document:document, nGuests:nGuests})
{
    let printElement = [];

    let printHeader = document.createElement('header');
    printElement.push(printHeader);
    let buttonBack = document.createElement('button');
    printHeader.appendChild(buttonBack);
    buttonBack.classList.value ='btn btn-warning selectButton';
    buttonBack.addEventListener('click', () => {window.location.hash = '#select-dish'})
    buttonBack.textContent = 'Go Back & Edit Dinner';
    let viewHeading = document.createElement('h1');
    printHeader.appendChild(viewHeading);
    viewHeading.textContent = 'Dinner for ' + nGuests + ' People';

    let printMain = document.createElement('main');
    printElement.push(printMain);
    printMain.id = 'print=dish-list';

    return printElement;
}