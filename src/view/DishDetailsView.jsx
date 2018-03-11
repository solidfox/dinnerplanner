import {View} from "./view";
import Rx from "rxjs/Rx";
import {catchError} from 'rxjs/operators';
import React from "react";

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

        let idObservable = Rx.Observable.fromEvent(window, 'hashchange')
            .startWith(null)
            .map(_ => extractId(window.location.hash));

        let dishObservable = idObservable
            .filter(maybeId => maybeId > 0)
            .do(console.log)
            .flatMap(id => Rx.Observable
                .fromPromise(model.getDish(id))
                .pipe(catchError(error => window.alert(`Error fetching dish: ${error}`)))
            );

        let interestingChanges =
            model.nGuestsObservable.combineLatest(
                dishObservable, (nGuests, dish) => {
                    return {
                        nGuests: nGuests, selectedDish: dish
                    }
                }
            );

        idObservable.subscribe(() => {
            this.render(null, null, true);
        });

        interestingChanges.subscribe(
            ({nGuests: nGuests, selectedDish: dish}) =>
                this.render(dish, nGuests));
    }

    get addToMenuObservable() {
        return this._addToMenuSubject;
    }

    render(dish, nGuests, waiting) {
        this.clear();

        if (waiting) {
            this.containerElement.innerHTML = "<img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' />";
        }

        if (dish) {
            React.DOM.render(<CreateDishDetail dish={dish} nGuest={nGuests} addToMenuSubject={this._addToMenuSubject} />, this.containerElement);
        }

    }

    clear() {
        this.containerElement.innerHTML = "";
    }

    get locationHash() {
        return "#dish-details";
    }

}

function CreateIngredientsRow (props) {
    return(
    <tr>
        <td>{props.nGuests * Math.round(props.ingredient.quantity * 100) / 100 + ' ' + props.ingredient.unit}</td>
        <td className="capitaliseLabel">{props.ingredient.name}</td>
    </tr>
    );
}

export class CreateDishDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            dish,
            nGuests,
            addToMenuSubject
        } = this.props;

        return [
            // -----------  Button ------------
            <button className="backToSearch btn btn-warning"
                    onClick={() => {window.location.hash = '#select-dish'}}>
                Back to Search</button>,
            // ----------- Title ------------
            <section className="dishName">
                <h1 className="capitaliseLabel">{dish.name}</h1>
            </section>,
            // ----------- Image -----------
            <section className="picture">
                <img className="imageDish" src={dish.image}
                     title={dish.name + ' - ' + dish.credit} />
            </section>,
            // ----------- Preparation ------------
            <section className="preparation">
                <h4 className="softHeading">Description & Preparation</h4>
                <h6 className="capitaliseLabel"> {
                    'Ready in ' + dish.readyTime + ' mins • Health Score: '
                    + dish.score + '/100 • ' + dish.type } </h6>
                <p>{dish.description}</p>
                <br />
                <a href={dish.sourceURL} target='_blank'> View More Details > </a>
            </section>,
            // ----------- Ingredients ------------
            <section className="ingredients" id="ingredients-table">
                <button className="btn btn-danger btn-lg btn-block selectButton"
                        onClick={() => addToMenuSubject.next(dish)}>
                    {'Add to Menu - $' + Math.round(nGuests * dish.price * 100) / 100 + ' for ' + nGuests + ' people'}
                </button>
                <table className='ingredients countTable center'>
                    <thead><tr>
                        <th>Quantity</th>
                        <th>Ingredients</th>
                    </tr></thead>
                    <tbody>
                    {dish.ingredients.map(ingredient => <CreateIngredientsRow ingredient={ingredient} nGuests={nGuests} />)}
                    </tbody>
                </table>
            </section>,
        ]
    }
}
