import {createDishThumbnail} from "../components/DishThumbnail.jsx";
import * as Rx from "rxjs";
import React from "react";
import DishThumbnail from "../components/DishThumbnail.jsx";
import PropTypes from 'prop-types';
import {searchText, searchType} from "../Actions";
import {getSearchResults} from "../model/core";
import LoadingArticle from "../components/LoadingArticle.jsx";

export default function SelectDish({dishTypes, dispatch, foundDishes}) {

    const dishList = !foundDishes ? <LoadingArticle/>
        : foundDishes.map(dish => <DishThumbnail dish={dish}
                                                 title={dish.name}
                                                 dishId={dish.id}
                                                 imageURL={dish.image}
                                                 dispatch={dispatch}
                                                 key={dish.id}
        />);

    return (
        <article>
            <h1>Find a dish</h1>
            <section className="dish-search-form">
                <input type="text"
                       placeholder="Filter on titles and ingredients"
                       onInput={event => dispatch(searchText(event.target.value))}/>
                <label>Filter by: </label>
                <select className="btn btn-danger"
                        onChange={event => dispatch(searchType(event.target.value))}>
                    {dishTypes
                        .map(dishType => <option key={dishType}
                                                 value={dishType}>{dishType}</option>)}
                </select>
            </section>
            <hr/>
            <ul className="dish-thumbnail-list">
                {dishList}

            </ul>
        </article>
    );
    /*
    static propTypes() {
        return {
            dispatch: PropTypes.func,
            filteredDishesFunc: PropTypes.func,
            dishTypes: PropTypes.arrayOf(PropTypes.string),
            foundDishes: PropTypes.arrayOf(PropTypes.string),
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
*/


}
