import {totalCostOfDish} from "../model/dinnerModel";
import {View} from "./view";
import Rx from "rxjs/Rx";

function createDishRow(document, dishName, dishCost, nGuests) {
    let tableRow = document.createElement("tr");
    let dishNameCell = document.createElement("td");
    dishNameCell.textContent = dishName;
    let dishCostCell = document.createElement("td");
    dishCostCell.textContent = dishCost*nGuests;
    dishCostCell.classList.add("currency");
    tableRow.appendChild(dishNameCell);
    tableRow.appendChild(dishCostCell);

    return tableRow;
}

function connectIncrementers(valueElement, incrementElement, decrementElement, observer) {

    let incrementElemClick = Rx.Observable.fromEvent(incrementElement, 'click');
    let subscription1 = incrementElemClick.map(() => ++(valueElement.value)).subscribe(observer);

    let decrementElemClick = Rx.Observable.fromEvent(decrementElement, 'click');
    let subscription2 = decrementElemClick.map(() => --(valueElement.value)).subscribe(observer);

    return [subscription1, subscription2];

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

        this._nGuestsSubject = new Rx.BehaviorSubject(model.nGuests);

        this._subscriptions = [];

        this.render({selectedDishes: model.selectedDishes, nGuests: model.nGuests, totalCost: model.totalCost});

        let interestingChanges =
            model.nGuestsObservable.combineLatest(
                model.selectedDishesObservable,
                (nGuests, selectedDishes) => {
                    return {nGuests: nGuests, selectedDishes: selectedDishes, totalCost: model.totalCost};
                }
            );

        interestingChanges.subscribe(event => this.render(event));
    }

    render({selectedDishes:selectedDishes, nGuests:nGuests, totalCost:totalCost}) {
        this.clear();
        console.log("Rendering");
        let rendering = createMenu({document:document, nGuests:nGuests, selectedDishes:selectedDishes, totalCost:totalCost});
        rendering.elements.forEach(element => {

            this.containerElement.appendChild(element)
        });
        // this._nGuestsObservable =
        //     Rx.Observable.fromEvent(this._nGuestsElement, 'input')
        //         .map(event => event.srcElement.value);
        // this._subscriptions.push(this._nGuestsObservable.subscribe(this._nGuestsSubject));
    }

    clear() {
        this.containerElement.innerHTML = "";
    }

    get nGuestsObservable() {
        return this._nGuestsSubject;
    }

    get numberOfGuests() {
        return this._nGuestsElement.value;
    }

    set numberOfGuests(newValue) {
        this._nGuestsElement.value = newValue;
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

function createGuestCounter(document, nGuests) {
    let guestCounter = document.createElement('section');
    guestCounter.classList.value = 'input-group number-of-people-view';

    let counterPrepend = document.createElement('div');
    guestCounter.appendChild(counterPrepend);
    counterPrepend.classList.add('input-group-prepend');
    let peopleLabel = document.createElement('label');
    counterPrepend.appendChild(peopleLabel);
    peopleLabel.classList.add('input-group-text');
    peopleLabel.setAttribute('for', 'numberOfGuests');
    peopleLabel.textContent = 'People';
    let buttonMinus = document.createElement('button');
    counterPrepend.appendChild(buttonMinus);
    buttonMinus.classList.value = 'btn btn-secondary';
    buttonMinus.id = 'decreaseNumberOfGuests';
    buttonMinus.textContent = '-';
    // TODO Listeners

    let guestInput = document.createElement('input');
    guestCounter.appendChild(guestInput);
    guestInput.classList.value ='form-control';
    guestInput.id = 'numberOfGuests';
    guestInput.type = 'number';
    guestInput.value = nGuests;

    let counterAppend = document.createElement('div');
    guestCounter.appendChild(counterAppend);
    counterAppend.classList.add('input-group-append');
    let buttonPlus = document.createElement('button');
    counterAppend.appendChild(buttonPlus);
    buttonPlus.classList.value = 'btn btn-secondary';
    buttonPlus.id = 'increaseNumberOfGuests';
    buttonPlus.textContent = '+';
    // TODO Listeners

    return guestCounter;
}

function createMenuTable(document, nGuests, selectedDishes, totalCost) {
    let menuTable = document.createElement('table');
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
    selectedDishes.forEach(dish => menuTableBody.appendChild(createDishRow(document, dish.name, dish.cost, nGuests)));

    let menuTableFoot = document.createElement('tfoot');
    menuTable.appendChild(menuTableFoot);
    let menuFootRow = document.createElement('tr');
    menuTableFoot.appendChild(menuFootRow);
    let menuFootTotal = document.createElement('th');
    menuFootRow.appendChild(menuFootTotal);
    menuFootTotal.textContent = 'Total';
    let menuFootCost = document.createElement('th');
    menuFootRow.appendChild(menuFootCost);
    menuFootCost.textContent = totalCost;
    menuFootCost.classList.add('currency');
    menuFootCost.id = 'menuTotals';

    return menuTable;
}

export function createMenu ({document: document,
                            nGuests: nGuests,
                            selectedDishes: selectedDishes,
                            totalCost: totalCost}) {
    let menuElements = [];

    let menuhead = document.createElement('h2');
    menuElements.push(menuhead);
    menuhead.textContent= 'My Dinner';

    menuElements.push(createGuestCounter(document, nGuests));

    menuElements.push(createMenuTable(document, nGuests, selectedDishes, totalCost));


    let buttonConfirmDinner = document.createElement('button');
    menuElements.push(buttonConfirmDinner);
    buttonConfirmDinner.classList.value= 'btn btn-primary';
    buttonConfirmDinner.id = 'confirm-dinner';
    buttonConfirmDinner.textContent= 'Confirm Dinner';
    buttonConfirmDinner.addEventListener('click', () => {
        window.location.hash = '#dinner-overview'})

    return {elements:menuElements};
}
