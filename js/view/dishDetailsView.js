import {totalCostOfDish} from "../model/dinnerModel";
import {View} from "./view";
import Rx from "rxjs/Rx";

function extractId(searchString) {
    return Number(searchString.split("@")[1]);
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
export default class DishDetailsView extends View {

    constructor(containerElement, model) {
        super(containerElement);

        this._addToMenuSubject = new Rx.Subject();

        let dishIDObservable = Rx.Observable.fromEvent(window, 'hashchange')
            .startWith(null)
            .map(_ => extractId(window.location.hash));

        let interestingChanges =
            model.nGuestsObservable.combineLatest(
                dishIDObservable, (nGuests, dishID) => {
                    return {
                        nGuests: nGuests, selectedDish: model.getDish(dishID)
                    }
                }
            );

        interestingChanges.subscribe(changes => this.render(changes.selectedDish, changes.nGuests));
    }

    get addToMenuObservable() {
        return this._addToMenuSubject;
    }

    render(dish, nGuests) {
        this.clear();

        if (dish) {
            let dishDetail = createDishDetail({document: document, dish: dish, nGuests: nGuests});

            dishDetail.elements.forEach(element => {
                this.containerElement.appendChild(element)
            });

           dishDetail.observable.addToMenuClick.subscribe(this._addToMenuSubject);
        }

    }

    clear() {
        this.containerElement.innerHTML = "";
    }

    get locationHash() {
        return "#dish-details";
    }

}

export function createDishDetail({document: document, dish: dish, nGuests: nGuests}) {

    let dishElements = [];

    // ----------- Header ------------

    let headerElement = document.createElement('header');
    dishElements.push(headerElement);

    let h1Element = document.createElement('h1');
    headerElement.appendChild(h1Element);
    h1Element.classList.add('capitaliseLabel');
    h1Element.textContent = dish.name;

    let buttonElement = document.createElement('button');
    buttonElement.classList.value = 'btn btn-warning';
    buttonElement.addEventListener('click', () => {
        window.location.hash = '#select-dish'
    });
    buttonElement.textContent = '< Back to Search';
    headerElement.appendChild(buttonElement);

    // ----------- Image -----------

    let sectionImage = document.createElement('section');
    dishElements.push(sectionImage);
    sectionImage.classList.add('picture')


  /*  let hrHeader = document.createElement('hr');
    sectionDescription.appendChild(hrHeader);
    hrHeader.style = "margin:10px";
    hrHeader.width = '100%';
*/
    let dishImage = document.createElement('img');
    dishImage.classList.value = 'imageDish';
    dishImage.src = '/images/' + dish.image;
    sectionImage.appendChild(dishImage);


    // ----------- Description ------------

    let sectionDescription = document.createElement('section');
    sectionDescription.classList.add('description');
    dishElements.push(sectionDescription);

    let descriptionHeading = document.createElement('h4');
    sectionDescription.appendChild(descriptionHeading);
    descriptionHeading.classList.add('softHeading');
    descriptionHeading.textContent = 'Description';

    let descriptionBody = document.createElement('p');
    sectionDescription.appendChild(descriptionBody);
    descriptionBody.textContent = dish.description;


    // ----------- Preparation ------------

    let sectionPrepration = document.createElement('section');
    sectionPrepration.classList.add('preparation');
    dishElements.push(sectionPrepration);

    let preprationHeading = document.createElement('h4');
    sectionPrepration.appendChild(preprationHeading);
    preprationHeading.classList.add('softHeading');
    preprationHeading.textContent = 'Prepration';

    let preprationBody = document.createElement('p');
    sectionPrepration.appendChild(preprationBody);
    preprationBody.textContent = dish.description;


    // ----------- Ingredients ------------

    let sectionIngredients = document.createElement('section');
    sectionIngredients.classList.add('ingredients');
    sectionIngredients.id = 'ingredients-table';
    dishElements.push(sectionIngredients);

    let ingredientHeading = document.createElement('h4');
    sectionIngredients.appendChild(ingredientHeading);
    ingredientHeading.textContent = 'Ingredients for ' + nGuests + ' People';

    let ingredientsTable = document.createElement('table');
    ingredientsTable.classList.value = 'ingredients countTable center';
    sectionIngredients.appendChild(ingredientsTable);

    let thead = document.createElement('thead');
    ingredientsTable.appendChild(thead);
    let rowHead = document.createElement('tr');
    thead.appendChild(rowHead);
    let headQuantity = document.createElement('th');
    rowHead.appendChild(headQuantity);
    headQuantity.textContent = 'Quantity';
    let headIngredients = document.createElement('th');
    rowHead.appendChild(headIngredients);
    headIngredients.textContent = 'Ingredients';
    let headCost = document.createElement('th');
    rowHead.appendChild(headCost);
    headCost.textContent = 'Cost';

    let tBody = document.createElement('tBody');
    ingredientsTable.appendChild(tBody);

    function createIngredientsRow(ingredient) {
        let rowBody = document.createElement('tr');

        let bodyQuantity = document.createElement('td');
        rowBody.appendChild(bodyQuantity);
        bodyQuantity.textContent = nGuests * Math.round(ingredient.quantity*100)/100 + ' ' + ingredient.unit;
        let bodyIngredients = document.createElement('td');
        rowBody.appendChild(bodyIngredients);
        bodyIngredients.classList.add('capitaliseLabel');
        bodyIngredients.textContent = ingredient.name;
        let bodyCost = document.createElement('td');
        rowBody.appendChild(bodyCost);
        bodyCost.classList.add("currency");
        bodyCost.textContent = nGuests * ingredient.price;

        return rowBody;
    }

    dish.ingredients.forEach(function (ingredient) {
        tBody.appendChild(createIngredientsRow(ingredient));
    });


    let tfoot = document.createElement('tfoot');
    ingredientsTable.appendChild(tfoot);

    let rowFoot = document.createElement('tr');
    tfoot.appendChild(rowFoot);
    let footQuantity = document.createElement('th');
    rowFoot.appendChild(footQuantity);
    footQuantity.textContent = 'Total: ';
    let footTotal = document.createElement('th');
    rowFoot.appendChild(footTotal);
    let footCost = document.createElement('th');
    rowFoot.appendChild(footCost);
    footCost.classList.add("currency");
    footCost.textContent = totalCostOfDish(dish) * nGuests;

    let addToMenuButton = document.createElement('button');
    sectionIngredients.appendChild(addToMenuButton);
    addToMenuButton.classList.value = 'btn btn-warning selectButton';
    addToMenuButton.addEventListener('click', () => {
        window.location.hash = '#select-dish'
    })
    addToMenuButton.textContent = 'Add to Menu';

    let addToMenuButtonObservable = Rx.Observable
        .fromEvent(addToMenuButton, 'click')
        .map(event => dish);


    return {
        elements: dishElements,
        observable: {addToMenuClick: addToMenuButtonObservable}
    };
}