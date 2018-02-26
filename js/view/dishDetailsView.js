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

        let dishObservable = Rx.Observable.fromEvent(window, 'hashchange')
            .startWith(null)
            .map(_ => extractId(window.location.hash))
            .filter(maybeId => maybeId > 0)
            .do(console.log)
            .flatMap(id => Rx.Observable.fromPromise(model.getDish(id)));

        let interestingChanges =
            model.nGuestsObservable.combineLatest(
                dishObservable, (nGuests, dish) => {
                    return {
                        nGuests: nGuests, selectedDish: dish
                    }
                }
            );

        interestingChanges.subscribe(
            ({nGuests: nGuests, selectedDish: dish}) =>
                this.render(dish, nGuests));
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

    // -----------  Button ------------

    let headerElement = document.createElement('header');
    dishElements.push(headerElement);

    let buttonElement = document.createElement('button');
    buttonElement.classList.add('backToSearch')
    buttonElement.classList.value = 'btn btn-warning';
    buttonElement.addEventListener('click', () => {
        window.location.hash = '#select-dish'
    });
    buttonElement.textContent = '< Back to Search';
    headerElement.appendChild(buttonElement);

    // ----------- Title ------------

    let sectionTitle = document.createElement('section');
    dishElements.push(sectionTitle);
    sectionTitle.classList.add('dishName')

    let h1Element = document.createElement('h1');
    sectionTitle.appendChild(h1Element);
    h1Element.classList.add('capitaliseLabel');
    h1Element.textContent = dish.name;

    // ----------- Image -----------

    let sectionImage = document.createElement('section');
    dishElements.push(sectionImage);
    sectionImage.classList.add('picture')

    let dishImage = document.createElement('img');
    dishImage.classList.value = 'imageDish';
    dishImage.src = dish.image;
    dishImage.title = dish.name + ' - ' + dish.credit;
    sectionImage.appendChild(dishImage);


  /*  // ----------- Description ------------

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
*/

    // ----------- Preparation ------------

    let sectionPreparation = document.createElement('section');
    sectionPreparation.classList.add('preparation');
    dishElements.push(sectionPreparation);

    let preparationHeading = document.createElement('h4');
    sectionPreparation.appendChild(preparationHeading);
    preparationHeading.classList.add('softHeading');
    preparationHeading.textContent = 'Description';

    let preparationSubHeading = document.createElement('h6');
    sectionPreparation.appendChild(preparationSubHeading);
    preparationSubHeading.classList.add('capitaliseLabel')
    preparationSubHeading.textContent =
        'Ready in ' + dish.readyTime + ' mins • Health Score: '
        + dish.score + '/100 • ' + dish.type;

    let preparationBody = document.createElement('p');
    sectionPreparation.appendChild(preparationBody);
    preparationBody.textContent = dish.description + ' ';

    let sourceLink = document.createElement('a');
    preparationBody.appendChild(sourceLink);
    sourceLink.href = dish.sourceURL;
    sourceLink.target = 'blank';
    sourceLink.textContent = 'View Source.'


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
    //let headCost = document.createElement('th');
    //rowHead.appendChild(headCost);
    //headCost.textContent = 'Cost';

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
        //let bodyCost = document.createElement('td');
        //rowBody.appendChild(bodyCost);
        //bodyCost.classList.add("currency");
        //bodyCost.textContent = nGuests * ingredient.price;

        return rowBody;
    }

    dish.ingredients.forEach(function (ingredient) {
        tBody.appendChild(createIngredientsRow(ingredient));
    });

/*
    let tfoot = document.createElement('tfoot');
    ingredientsTable.appendChild(tfoot);

    let rowFoot = document.createElement('tr');
    tfoot.appendChild(rowFoot);
    let footQuantity = document.createElement('th');
    rowFoot.appendChild(footQuantity);
    footQuantity.textContent = 'Total Cost: ';
    let footTotal = document.createElement('th');
    footTotal.textContent = dish.price * nGuests;
    footTotal.classList.add('currency')
    rowFoot.appendChild(footTotal);
    let footCost = document.createElement('th');
    //rowFoot.appendChild(footCost);
    //footCost.classList.add("currency");
    //footCost.textContent = totalCostOfDish(dish) * nGuests;

    //let footTotal = document.createElement('th');
    //sectionIngredients.appendChild(footTotal);
    //footTotal.textContent = 'Total Cost: $' + dish.price;
*/


    let addToMenuButton = document.createElement('button');
    sectionIngredients.appendChild(addToMenuButton);
    addToMenuButton.classList.value = 'btn btn-warning btn-lg btn-block selectButton';
    addToMenuButton.addEventListener('click', () => {
        window.location.hash = '#select-dish'
    });
    let totalCost = Math.round(nGuests*dish.price*100)/100;
    addToMenuButton.textContent =  'Add to Menu - $' + totalCost + ' for ' + nGuests + ' people';

    let addToMenuButtonObservable = Rx.Observable
        .fromEvent(addToMenuButton, 'click')
        .map(event => dish);


    return {
        elements: dishElements,
        observable: {addToMenuClick: addToMenuButtonObservable}
    };
}