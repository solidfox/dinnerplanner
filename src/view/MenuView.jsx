import {totalCostOfDish} from "../model/dinnerModel";
import {View} from "./view";
import Rx from "rxjs/Rx";
import ResponsiveDesign from "../ResponsiveDesign";

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
        this._removeDishSubject = new Rx.Subject();

        let interestingChanges =
            model.nGuestsObservable.distinctUntilChanged().combineLatest(
                model.selectedDishesObservable.distinctUntilChanged(),
                (nGuests, selectedDishes) => {
                    return {
                        nGuests: nGuests,
                        selectedDishes: selectedDishes,
                        totalCost: model.totalMenuCost,
                        dishTypes: model.dishTypes
                    };
                }
            );

        interestingChanges.subscribe(event => this.render(event));
    }

    render({selectedDishes, nGuests, totalCost, dishTypes}) {
        this.clear();
        console.log("Rendering");
        let rendering = createMenu({
            document: document,
            removeDishSubject: this._removeDishSubject,
            nGuests: nGuests,
            selectedDishes: selectedDishes,
            totalCost: totalCost,
            dishTypes: dishTypes
        });
        rendering.elements.forEach(element => {
            this.containerElement.appendChild(element)
        });
        rendering.observables.nGuestsInput.subscribe(this._nGuestsSubject);

        this._nGuestsSubject.sample(rendering.observables.minusClick)
            .map(nGuests => Math.max(nGuests - 1, 1))
            .subscribe(this._nGuestsSubject);

        this._nGuestsSubject.sample(rendering.observables.plusClick)
            .map(nGuests => nGuests + 1)
            .subscribe(this._nGuestsSubject);

    }

    clear() {
        this.containerElement.innerHTML = "";
    }

    get removeDishObservable() {
        return this._removeDishSubject;
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
    guestInput.classList.value = 'form-control';
    guestInput.id = 'numberOfGuests';
    guestInput.type = 'number';
    guestInput.value = nGuests;

    let nGuestsObservable =
        Rx.Observable.fromEvent(guestInput, 'input')
            .map(event => Number(event.srcElement.value));

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
        element: guestCounter,
        observables: {
            nGuestsInput: nGuestsObservable,
            plusClick: plusClickObservable,
            minusClick: minusClickObservable
        }
    };
}

function DishRow(props) {
    return (
        <tr>
            <td className="capitaliseLabel" onClick={window.location.hash = '#dish-details@' + props.dishID}>
                {props.dishName}</td>
            <td className="crossEmoji" onClick={props.removeDish.next(props.dishID)}> // Remove Dish Here
                ❌
            </td>
            <td className="currency">
                {String(Math.round(props.dishCost * 100) / 100 * props.nGuests)}
            </td>
        </tr>
    );
}

class MenuTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            removeDishSubject, nGuests, selectedDishes, totalCost,
        } = this.props;

        return (
            <table className="countTable center" width="100%">
                <thead>
                <tr>
                    <th>Dish Name</th>
                    <th></th>
                    <th align="right">Cost</th>
                </tr>
                </thead>
                <tbody id="menuDishes"> {
                    selectedDishes.map(dish =>
                        <DishRow removeDish={removeDishSubject}
                                       dishID={dish.id}
                                       dishName={dish.name}
                                       dishCost={dish.price} nGuests={nGuests}
                        />)
                } </tbody>
                <tfoot>
                <tr>
                    <th>{'Total for ' + nGuests + 'people: '}</th>
                    <th className="currency" id="menuTotals">
                        {Math.round(totalCost * 100) / 100}
                    </th>
                </tr>
                </tfoot>
            </table>
        )
    }
}

/*

function createDishRow(document, removeDishSubject, dishID, dishName, dishCost, nGuests) {
    let tableRow = document.createElement("tr");

    let dishNameCell = document.createElement("td");
    tableRow.appendChild(dishNameCell);
    dishNameCell.classList.add('capitaliseLabel')
    dishNameCell.textContent = dishName;
    dishNameCell.addEventListener('click', () => {
        window.location.hash = '#dish-details@' + dishID;
    });

    let dishRemoveCell = document.createElement("td");
    tableRow.appendChild(dishRemoveCell);
    dishRemoveCell.classList.add("crossEmoji");
    dishRemoveCell.textContent = '❌ ';
    let dishRemoveObservable = Rx.Observable
        .fromEvent(dishRemoveCell, 'click')
        .map(() => dishID);
    dishRemoveObservable.subscribe(removeDishSubject);

    let dishCostCell = document.createElement("td");
    dishCostCell.textContent = String(Math.round(dishCost * 100) / 100 * nGuests);
    dishCostCell.classList.add("currency");
    tableRow.appendChild(dishCostCell);


    return tableRow;
}

function createMenuTable(document, removeDishSubject, nGuests, selectedDishes, totalCost, dishTypes) {

    let menuTable = document.createElement('table');
    menuTable.classList.value = 'countTable center';
    menuTable.width = '100%';
    let menuTableHead = document.createElement('thead');
    menuTable.appendChild(menuTableHead);
    let menuHeadRow = document.createElement('tr');
    menuTableHead.appendChild(menuHeadRow);

    let menuHeadDish = document.createElement('th')
    menuHeadRow.appendChild(menuHeadDish);
    menuHeadDish.textContent = 'Dish Name';
    let menuHeadRemove = document.createElement('th')
    menuHeadRow.appendChild(menuHeadRemove);
    menuHeadRemove.textContent = '';
    let menuHeadCost = document.createElement('th');
    menuHeadRow.appendChild(menuHeadCost);
    menuHeadCost.textContent = 'Cost';

    let menuTableBody = document.createElement('tbody');
    menuTable.appendChild(menuTableBody);
    menuTableBody.id = 'menuDishes';
    let sortedDishes = selectedDishes;//dishTypes
        // .map(type => {
        //     let matches = selectedDishes.filter(dish => dish.type === type);
        //     return matches.length === 1 ? matches[0] : null;
        // })
        //  .filter(elem => elem !== null);
        //const dishRows = sortedDishes.map((dish) => createDishRow(document, removeDishSubject, dish.id, dish.name, totalCostOfDish(dish), nGuests));
        sortedDishes.forEach(dish =>
            menuTableBody.appendChild(createDishRow(document, removeDishSubject, dish.id, dish.name, dish.price, nGuests)));

    let menuTableFoot = document.createElement('tfoot');
    menuTable.appendChild(menuTableFoot);
    let menuFootRow = document.createElement('tr');
    menuTableFoot.appendChild(menuFootRow);

        let menuFootTotal = document.createElement('th');
        menuFootRow.appendChild(menuFootTotal);
        menuFootTotal.textContent = 'Total for ' + nGuests + ' people:';
    let menuFootRemove = document.createElement('th');
    menuFootRow.appendChild(menuFootRemove);
    menuFootRemove.textContent = '';
        let menuFootCost = document.createElement('th');
        menuFootRow.appendChild(menuFootCost);
        menuFootCost.textContent = Math.round(totalCost * 100) / 100;
        menuFootCost.classList.add('currency');
        menuFootCost.id = 'menuTotals';

    return menuTable;
}*/

export function creatMeMenu({
                               document: document,
                               removeDishSubject: removeDishSubject,
                               nGuests: nGuests,
                               selectedDishes: selectedDishes,
                               totalCost: totalCost,
                               dishTypes
                           }) {
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
    menuHeader.setAttribute('aria-expanded', 'false');

    let menuHeading = document.createElement('h1');
    menuHeader.appendChild(menuHeading);
    menuHeading.textContent = 'My Dinner';

    let menuHamburger = document.createElement('h1');
    menuHeader.appendChild(menuHamburger);
    menuHamburger.classList.add('only-when-collapsed');
    menuHamburger.classList.add('currency');
    menuHamburger.textContent = Math.round(totalCost * 100) / 100 + ' ≣';

    let menuBody = document.createElement('section');
    menuElements.push(menuBody);
    menuBody.classList.value = 'collapse show menu-body';
    Rx.Observable.merge(Rx.Observable.fromEvent(document.defaultView, 'resize'),
        Rx.Observable.fromEvent(window, 'load'))
        .map(event => event.srcElement.innerWidth)
        .map(width => ResponsiveDesign.sizeClass(width))
        .distinctUntilChanged()
        .subscribe(sizeClass => {
            console.log(sizeClass);
            if (sizeClass === ResponsiveDesign.sizeClasses.compact) {
                console.log("hiding");
                menuBody.classList.remove('show');
                menuHeader.setAttribute('aria-expanded', 'false');
            } else {
                menuBody.classList.add('show');
                menuHeader.setAttribute('aria-expanded', 'true');
            }
        });

    let guestCounterRendering = createGuestCounter(document, nGuests);
    menuBody.appendChild(guestCounterRendering.element);

    selectedDishes.length !== 0 ? [
        <MenuTable removeDishSubject={removeDishSubject}
                         nGuests={nGuests}
                         dish={dish}
                         selectedDishes={selectedDishes}
                         totalCost={totalCost}
        />,

        //  let menuTableRendering = createMenuTable(document, removeDishSubject, nGuests, selectedDishes, totalCost, dishTypes);
        // menuBody.appendChild(menuTableRendering);

        let buttonConfirmDinner = document.createElement('button');
        menuBody.appendChild(buttonConfirmDinner);
        buttonConfirmDinner.classList.value = 'btn btn-primary btn-lg btn-block';
        buttonConfirmDinner.id = 'confirm-dinner';
        buttonConfirmDinner.textContent = 'Confirm Dinner';
        buttonConfirmDinner.addEventListener('click', () => {
            window.location.hash = '#dinner-overview'
        })
    ] : [
        let buttonConfirmDinner = document.createElement('button');
        menuBody.appendChild(buttonConfirmDinner);
        buttonConfirmDinner.classList.value = 'btn btn-secondary btn-lg btn-block';
        buttonConfirmDinner.setAttribute('disabled', '');
        buttonConfirmDinner.id = 'confirm-dinner';
        buttonConfirmDinner.textContent = 'No Dishes in Menu';

        let helpText = document.createElement('p');
        menuBody.appendChild(helpText);
        helpText.classList.add('helpText');
        helpText.textContent = 'You can search & select dishes. Once you find a dish you like, you can add it to the menu.'
    ]

    return {
        elements: menuElements,

        observables: guestCounterRendering.observables

    };
}
