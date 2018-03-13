import {createDishThumbnail} from "../components/DishThumbnail.jsx";
import * as Rx from "rxjs";
import React from "react";
import DishThumbnail from "../components/DishThumbnail.jsx";
import PropTypes from 'prop-types';

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
export default class SelectDish extends React.Component {

    static propTypes() {
        return {
            dispatch: PropTypes.func,
            filteredDishesFunc: PropTypes.func,
            dishTypes: PropTypes.arrayOf(PropTypes.string),
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            dishList: [],
            searchTextSubject: new Rx.BehaviorSubject(""),
            typeSubject: new Rx.BehaviorSubject(props.dishTypes[0]),
        };

        let initiateSearch =
            this.state.searchTextSubject
                .throttleTime(500)
                .startWith("")
                .combineLatest(
                    this.state.typeSubject
                        .startWith("all"),
                    (search, type) => ({search:search, type: type})
                );

        let dishesObservable = initiateSearch.flatMap(({search, type}) =>
            Rx.Observable.fromPromise(props.filteredDishesFunc(type, search)));

        dishesObservable.subscribe(dishes => this.setState({
            dishList:dishes,
            searchTextSubject: this.state.searchTextSubject,
            typeSubject: this.state.typeSubject,
        }));
    }

    render() {
        return (
            <article>
                <h1>Find a dish</h1>
                <section className="select-dish-search-form">
                    <input className type="text" placeholder="Filter on titles and ingredients" onInput={event => {
                        console.log(event);
                        this.state.searchTextSubject.next(event.target.value)}}/>
                    <label>Filter by: </label>
                    <select className="btn btn-danger" onChange={event => this.state.typeSubject.next(event.target.value)}>
                        {this.props.dishTypes
                            .map(dishType => <option className="capitaliseLabel"
                                                     key={dishType}
                                                     value={dishType}>{dishType}</option>)}
                    </select>
                </section>
                <hr/>
                <ul className="dish-thumbnail-list">
                    {this.state.dishList.map(dish => <DishThumbnail dish={dish}
                                                                    title={dish.name}
                                                                    dishId={dish.id}
                                                                    imageURL={dish.image}
                                                                    cost={dish.price}
                                                                    dispatch={this.props.dispatch}
                    />)}
                </ul>
            </article>
        )
    }
}
