import {totalCostOfDish} from "../model/dinnerModel";
import {View} from "./view";


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
export class DishDetailsView extends View {

    constructor(containerElement, model) {
        super(containerElement);

        let elements = createDishDetail({document:document, dish:model.getDish(1), nGuests:model.getNumberOfGuests()})

        elements.forEach(function (element) {containerElement.appendChild(element)})


    }

    get locationHash() {
        return "#dish-details";
    }

    update(model) {
    }

}

export function createDishDetail({document: document,
                                        dish:dish, nGuests:nGuests} ) {

    let elements = [];

    //let articleElement = document.createElement("article");
    //articleElement.classList.add('inactive');
    //articleElement.id = 'dish-details-view' ;

    let headerElement = document.createElement('header');
    elements.push(headerElement);

        let h1Element = document.createElement('h1');
        headerElement.appendChild(h1Element);
        h1Element.textContent = dish.name;

        let buttonElement = document.createElement('button');
        buttonElement.classList.value = 'btn-lg btn-warning';
        buttonElement.addEventListener('click', () => {
            window.location.hash = '#select-dish'})
    buttonElement.textContent = 'Back to Search';
        headerElement.appendChild(buttonElement);

        let hrHeader = document.createElement('hr');
        headerElement.appendChild(hrHeader);

    let sectionDescription = document.createElement('section');
    sectionDescription.classList.add('description');
    elements.push(sectionDescription);

        let dishImage = document.createElement('img');
        dishImage.src =  '/images/' + dish.image;
        sectionDescription.appendChild(dishImage);

        let descriptionHeading= document.createElement('h2');
        sectionDescription.appendChild(descriptionHeading);
        descriptionHeading.textContent = 'Description';

        let descriptionBody= document.createElement('p');
        sectionDescription.appendChild(descriptionBody);
        descriptionBody.textContent = dish.description;

    let sectionIngredients = document.createElement('section');
    sectionIngredients.classList.add('ingredients');
    elements.push(sectionIngredients);

        let ingredientHeading= document.createElement('h5');
        sectionIngredients.appendChild(ingredientHeading);
        ingredientHeading.textContent = 'Ingredients for'+ nGuests +'People';

        let ingredientsTable = document.createElement('table');
        ingredientsTable.classList.value = 'ingredients countTable center';
        sectionIngredients.appendChild(ingredientsTable);

            let thead = document.createElement('thead');
            ingredientsTable.appendChild(thead);
                let rowHead = document.createElement('tr');
                thead.appendChild(rowHead);
                    let headQuantity = document.createElement('th');
                    rowHead.appendChild(headQuantity);
                    headQuantity.textContent='Quantity';
                    let headIngredients = document.createElement('th');
                    rowHead.appendChild(headIngredients);
                    headIngredients.textContent='Ingredients';
                    let headSEK = document.createElement('th');
                    rowHead.appendChild(headSEK);
                    headSEK.textContent='';
                    let headCost = document.createElement('th');
                    rowHead.appendChild(headCost);
                    headCost.textContent='Cost';

            let tBody = document.createElement('tBody');
            ingredientsTable.appendChild(tBody);

                function createIngredientsRow (ingredient) {
                    let rowBody = document.createElement('tr');

                    let bodyQuantity = document.createElement('td');
                    rowBody.appendChild(bodyQuantity);
                    bodyQuantity.textContent= nGuests*ingredient.quantity + ' ' + ingredient.unit;
                    let bodyIngredients = document.createElement('td');
                    rowBody.appendChild(bodyIngredients);
                    bodyIngredients.textContent=ingredient.name;
                    let bodySEK = document.createElement('td');
                    rowBody.appendChild(bodySEK);
                    bodySEK.textContent='SEK ';
                    let bodyCost = document.createElement('td');
                    rowBody.appendChild(bodyCost);
                    bodyCost.textContent= nGuests*ingredient.price;

                    return rowBody;
                }

                dish.ingredients.forEach(function (ingredient) {
                    tBody.appendChild(createIngredientsRow(ingredient));
                });


             let tfoot = document.createElement('tfoot');
             ingredientsTable.appendChild(tfoot);

                let rowFoot = document.createElement('tr');
                tfoot.appendChild(rowFoot);
                let footQuantity = document.createElement('td');
                rowFoot.appendChild(footQuantity);
                footQuantity.textContent='';
                let footTotal = document.createElement('td');
                rowFoot.appendChild(footTotal);
                footTotal.textContent='Total: ';
                let footSEK = document.createElement('th');
                rowFoot.appendChild(footSEK);
                footSEK.textContent='SEK ';
                let footCost = document.createElement('td');
                rowFoot.appendChild(footCost);
                footCost.textContent= totalCostOfDish(dish)*nGuests;

                let rowButton = document.createElement('tr');
                tfoot.appendChild(rowButton);
                let confirmButton = document.createElement('button');
                rowButton.appendChild(confirmButton);
                confirmButton.classList.value = 'btn btn-warning selectButton';
                confirmButton.addEventListener('click', () => {
                    window.location.hash = '#select-dish'})
                confirmButton.textContent = 'Add to Menu';

    return elements;
}