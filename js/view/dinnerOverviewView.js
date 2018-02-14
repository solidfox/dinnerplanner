import {totalCostOfDish} from "../model/dinnerModel";
import {View} from "./view";
import {createDishThumbnail} from "../components/dishThumbnail";
import {createThumbnailHeading} from "../components/thumbnailHeading";

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
export default class DinnerOverviewView extends View {

    constructor(containerElement, model) {
        super(containerElement);

        this._dishList = containerElement.querySelector("#overview-dish-list");

        this._divider = document.createElement("li");
        this._divider.classList.add("vertical-divider");
        this._totals = undefined;

        model.selectedDishesObservable.subscribe(selectedDishes => {
            this.dishList = selectedDishes;
            this.totals = model.totalMenuCost;
        });
    }

    get locationHash() {
        return '#dinner-overview';
    }

    set dishList(newList) {
        this._dishList.innerHTML = "";
        newList.forEach(dish => {
            this._dishList.appendChild(createDishThumbnail({
                document: document,
                title:dish.name,
                dishID:dish.id,
                imageURL:'images/' + dish.image,
                cost:totalCostOfDish(dish)}))
        });
        if (this._totals) {
            this._dishList.appendChild(this._divider);
            this._dishList.appendChild(this._totals);
        }
    }

    set totals(newTotals) {
        if (this._totals) {
            this._divider.remove();
            this._totals.remove();
        }
        this._totals = createThumbnailHeading({
            document: document,
            header:3 + " People",
            caption: "Total cost",
            subCaption: newTotals});
        this._dishList.appendChild(this._divider);
        this._dishList.appendChild(this._totals);
    }

}
 
export function createOverview()
{
    let overviewElement = [];

    let overviewHeader = document.createElement('header');
    overviewElement.push(overviewHeader);
    let buttonBack = document.createElement('button');
    overviewHeader.appendChild(buttonBack);
    buttonBack.classList.value ='btn btn-warning selectButton';
    buttonBack.addEventListener('click', () => {window.location.hash = '#select-dish'})
    buttonBack.textContent = 'Go Back & Edit Dinner';
    let overviewHeading = document.createElement('h1');
    overviewHeader.appendChild(overviewHeading);
    overviewHeading.textContent = 'Dinner Overview';

    let dishList = document.createElement('ul');
    overviewElement.push(dishList);
    dishList.classList.value = 'dish-thumbnail-list';
    dishList.id = 'overview-dish-list';

    let printButton = document.createElement('button');
    overviewElement.push(printButton);
    printButton.classList.value = 'btn btn-warning selectButton';
    printButton.id = 'print_recipe';
    printButton.textContent = 'Print Full Recipe';
    printButton.addEventListener('click', () => {window.location.hash = '#print-dinner'})

    return overviewElement;
}