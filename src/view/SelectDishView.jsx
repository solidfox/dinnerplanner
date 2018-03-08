import {totalCostOfDish} from "../model/dinnerModel";
import {View} from "./view";
import {createDishThumbnail} from "../components/DishThumbnail.jsx";
import * as Rx from "rxjs";
import React from "react";
import ReactDOM from 'react-dom'
import DishThumbnail from "../components/DishThumbnail.jsx";

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
export default class SelectDishView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dishList: []
        }

        this._searchTextObservable = Rx.Observable.fromEvent(this._searchForm, 'input')
            .map(event => event.srcElement.value);
        this._typeObservable = Rx.Observable.fromEvent(this._typeSelect, 'change')
            .map(event => event.srcElement.value);

        let initiateSearch =
            this._searchTextObservable
                .throttleTime(500)
                .startWith("")
                .combineLatest(
                    this._typeObservable
                        .startWith("all"),
                    (search, type) => ({search:search, type: type})
                );

        let dishesObservable = initiateSearch.flatMap(({search, type}) =>
            Rx.Observable.fromPromise(model.filteredDishes(type, search)));

        dishesObservable.subscribe(dishes => this.render(dishes));
    }

    render() {
        return (
            <article className="inactive" id="select-dish-view">
                <h1>Find a dish</h1>
                <section className="select-dish-search-form">
                    <input className type="text" placeholder="Filter on titles and ingredients"/>
                    <label>Filter by: </label>
                    <select className="btn btn-danger">
                        {this.props.dishTypes.map(dishType => <option className="capitaliseLabel" value={dishType}>{dishType}</option>)}
                    </select>
                </section>
                <hr/>
                <ul className="dish-thumbnail-list">
                    {this.state.dishList.map(dish => <DishThumbnail dish={dish} title={dish.name} dishID={dish.id} imageURL={dish.image} cost={dish.price} />)}
                </ul>
            </article>
        )
    }
}
