import {totalCostOfDish} from "../model/dinnerModel";
import {View} from "./view";
import Rx from "rxjs/Rx";
import ResponsiveDesign from "../ResponsiveDesign";

function createDishRow(document, dishName, dishCost, nGuests) {
    let tableRow = document.createElement("tr");
    let dishNameCell = document.createElement("td");
    dishNameCell.classList.add('capitaliseLabel')
    dishNameCell.textContent = dishName;
    let dishCostCell = document.createElement("td");
    dishCostCell.textContent = String(dishCost * nGuests);
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
export default class MenuView extends View {

    constructor(containerElement, model) {
        super(containerElement);

        this._nGuestsSubject = new Rx.BehaviorSubject(model.nGuests);

        let interestingChanges =
            model.nGuestsObservable.distinctUntilChanged().combineLatest(
                model.selectedDishesObservable.distinctUntilChanged(),
                (nGuests, selectedDishes) => {
                    return {nGuests: nGuests, selectedDishes: selectedDishes, totalCost: model.totalMenuCost};
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
        rendering.observables.nGuestsInput.subscribe(this._nGuestsSubject);

        this._nGuestsSubject.sample(rendering.observables.minusClick)
            .map(nGuests => Math.max(nGuests - 1, 1))
            .subscribe(this._nGuestsSubject) ;

        this._nGuestsSubject.sample(rendering.observables.plusClick)
            .map(nGuests => nGuests + 1)
            .subscribe(this._nGuestsSubject);

    }

    clear() {
        this.containerElement.innerHTML = "";
    }

    get nGuestsObservable() {
        return this._nGuestsSubject;
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
    let minusClickObservable = Rx.Observable.fromEvent(buttonMinus, 'click');

    let guestInput = document.createElement('input');
    guestCounter.appendChild(guestInput);
    guestInput.classList.value ='form-control';
    guestInput.id = 'numberOfGuests';
    guestInput.type = 'number';
    guestInput.value = nGuests;

    let nGuestsObservable =
        Rx.Observable.fromEvent(guestInput, 'input')
            .map(event => event.srcElement.value);

    let counterAppend = document.createElement('div');
    guestCounter.appendChild(counterAppend);
    counterAppend.classList.add('input-group-append');
    let buttonPlus = document.createElement('button');
    counterAppend.appendChild(buttonPlus);
    buttonPlus.classList.value = 'btn btn-secondary';
    buttonPlus.id = 'increaseNumberOfGuests';
    buttonPlus.textContent = '+';
    let plusClickObservable = Rx.Observable.fromEvent(buttonPlus, 'click');

    return {
        element:guestCounter,
        observables: {
            nGuestsInput: nGuestsObservable,
            plusClick: plusClickObservable,
            minusClick: minusClickObservable
        }
    };
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
    let sortedDishes = ['starter', 'main dish', 'dessert']
        .map(type => {
            let matches = selectedDishes.filter(dish => dish.type === type);
            return matches.length === 1 ? matches[0] : null; })
        .filter(elem => elem !== null);
    sortedDishes.forEach(dish => menuTableBody.appendChild(createDishRow(document, dish.name, totalCostOfDish(dish), nGuests)));

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

    /**
     let menuhead = document.createElement('h2');
    menuElements.push(menuhead);
    menuhead.textContent= 'My Dinner';



  */

        // above code is normal menu. Code below is collapsing menu.
        // This should only work is mobile-width is detected
    let menuHeader = document.createElement('header');
    menuElements.push(menuHeader);
    menuHeader.setAttribute('data-toggle', 'collapse');
    menuHeader.setAttribute('data-target', '.menu-body');
    menuHeader.setAttribute('aria-expanded', 'true');
    menuHeader.setAttribute('aria-controls', 'menu-body');

    let menuHeading = document.createElement('h1');
    menuHeader.appendChild(menuHeading);
    menuHeading.textContent = 'My Dinner';
    let menuHamburger = document.createElement('h1');
    menuHeader.appendChild(menuHamburger);
    menuHamburger.textContent = '≣';

    let menuBody = document.createElement('section');
    menuElements.push(menuBody);
    menuBody.classList.value = 'collapse show menu-body';
    Rx.Observable.fromEvent(document.defaultView, 'resize')
        .map(event => event.srcElement.innerWidth)
        .map(width => ResponsiveDesign.sizeClass(width))
        .distinctUntilChanged()
        .subscribe(sizeClass => {
            console.log(sizeClass);
            if (sizeClass === ResponsiveDesign.sizeClasses.compact) {
                menuBody.classList.remove('show');
            } else {
                menuBody.classList.add('show');
            }
        });

    let guestCounterRendering = createGuestCounter(document, nGuests);
    menuBody.appendChild(guestCounterRendering.element);

    menuBody.appendChild(createMenuTable(document, nGuests, selectedDishes, totalCost));

    let buttonConfirmDinner = document.createElement('button');
    menuBody.appendChild(buttonConfirmDinner);
    buttonConfirmDinner.classList.value= 'btn btn-primary btn-lg btn-block';
    buttonConfirmDinner.id = 'confirm-dinner';
    buttonConfirmDinner.textContent= 'Confirm Dinner';
    buttonConfirmDinner.addEventListener('click', () => {
        window.location.hash = '#dinner-overview'})


    return {
        elements: menuElements,
        observables: guestCounterRendering.observables
    };
}
