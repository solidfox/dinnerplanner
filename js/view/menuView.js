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
export class MenuView extends View {

    constructor(containerElement, model) {
        super(containerElement);

        this._guestsElement = containerElement.querySelector("#numberOfGuests");

        this._dishesTable = containerElement.querySelector("#menuDishes");
        this._totalsElement = containerElement.querySelector("#menuTotals");

        this._plusButton = containerElement.querySelector("#plusGuest");
        this._minusButton = containerElement.querySelector("#minusGuest");

        this.update(model);
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
            this.numberOfGuests = model.nGuests;
            this.menu = model.selectedDishes;
            this.menuTotals = model.totalMenuCost;
        }
    }

}

export function wholemenu ({document: document}) {
    let menuElement = [];

    let menuhead = document.createElement('h2');
    menuElement.push(menuhead);
    menuhead.textContent= 'My Dinner';

    let guestCounter = document.createElement('section');
    menuElement.push(guestCounter);
    guestCounter.classList.value = 'input-group number-of-people-view';

    let counterPrepend = document.createElement('div');
    guestCounter.appendChild(counterPrepend);
    counterPrepend.classList.add('input-group-prepend');
    let peopleLabel = document.createElement('label');
    counterPrepend.appendChild(peopleLabel);
    peopleLabel.classList.add('input-group-text');
    //peopleLabel.for ='numberOfGuests';
    peopleLabel.textContent = 'People';
    let buttonMinus = document.createElement(button);
    counterPrepend.appendChild(buttonMinus);
    buttonMinus.classList.value = 'btn btn-secondary';
    buttonMinus.id = 'decreaseNumberOfGuests';
    buttonMinus.textContent = '-';

    let guestInput = document.createElement('input');
    guestCounter.appendChild(guestInput);
    guestInput.classList.value ='form-control';
    guestInput.id = 'numberOfGuests';
    guestInput.type = 'number';

    let counterAppend = document.createElement('div');
    guestCounter.appendChild(counterAppend);
    counterAppend.classList.add('input-group-append');
    let buttonPlus = document.createElement(button);
    counterAppend.appendChild(buttonPlus);
    buttonPlus.classList.value = 'btn btn-secondary';
    buttonPlus.id = 'increaseNumberOfGuests';
    buttonPlus.textContent = '+';


    let menuTable = document.createElement('table');
    menuElement.push(menuTable);
    menuTable.classList.value = 'countTable center';
    menuTable.width = '100%';

    let menuTableHead = document.createElement('thead');
    menuTable.appendChild(menuTableHead);
    let menuHeadRow =document.createElement('tr');
    menuTableHead.appendChild(menuHeadRow);
    let menuHeadDish = document.createElement('th')
    menuHeadRow.appendChild(menuHeadDish);
    menuHeadDish.textContent = 'Dish Name';
    let menuHeadCost = document.createElement('th');
    menuHeadRow.appendChild(menuHeadCost);
    menuHeadCost.textContent = 'Cost';

    let menuTableBody = document.createElement('tbody');
    menuTable.appendChild(menuTableBody);
    menuTableBody.id = 'menuDishes';

    let menuTableFoot = document.createElement('tfoot');
    menuTable.appendChild(menuTableFoot);
    let menuFootRow = document.createElement('tr');
    menuTableFoot.appendChild(menuFootRow);
    let menuFootTotal = document.createElement('th');
    menuFootRow.appendChild(menuFootTotal);
    menuFootTotal.textContent = 'Total';
    let menuFootCost = document.createElement('th');
    menuFootRow.appendChild(menuFootCost);
    menuFootCost.classList.add('currency');
    menuFootCost.id = 'menuTotals';


    let buttonConfirmDinner = document.createElement('button');
    menuElement.push(buttonConfirmDinner);
    buttonConfirmDinner.classList.value= 'btn btn-primary';
    buttonConfirmDinner.id = 'confirm-dinner';
    buttonConfirmDinner.textContent= 'Confirm Dinner';
    buttonConfirmDinner.addEventListener('click', () => {
        window.location.hash = '#dinner-overview'})

    return menuElement;
}
