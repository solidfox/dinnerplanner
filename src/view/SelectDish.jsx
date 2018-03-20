import React from "react";
import DishThumbnail from "../components/DishThumbnail.jsx";
import {searchText, searchType} from "../Actions";
import LoadingArticle from "../components/LoadingArticle.jsx";
import {getSearchType} from "../model/core";

export default function SelectDish({dishTypes, dispatch, foundDishes, currentSearchType}) {

    const dishList = !foundDishes ? <LoadingArticle/>
        : <ul className="dish-thumbnail-list" >
            {foundDishes.map(dish => <DishThumbnail dish={dish}
                                                 title={dish.name}
                                                 dishId={dish.id}
                                                 imageURL={dish.image}
                                                 dispatch={dispatch}
                                                 key={dish.id}
        />)}
        </ul>;

    return (
        <article>
            <h1>Find a dish</h1>
            <section className="dish-search-form">
                <input type="text"
                       placeholder="Filter on titles and ingredients"
                       onInput={event => dispatch(searchText(event.target.value))}/>
                <label>Filter by: </label>
                <select className="btn btn-danger" value={currentSearchType}
                        onChange={event => dispatch(searchType(event.target.value))}>
                    {dishTypes
                        .map(dishType => <option key={dishType}
                                                 value={dishType}>{dishType}</option>)}
                </select>
            </section>
            <hr/>

                {dishList}

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
