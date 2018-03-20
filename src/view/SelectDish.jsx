import React from "react";
import DishThumbnail from "../components/DishThumbnail.jsx";
import {searchText, searchType} from "../Actions";
import LoadingArticle from "../components/LoadingArticle.jsx";

export default function SelectDish({dishTypes, dispatch, foundDishes, currentSearchType, currentSearchText}) {

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
                       placeholder="Filter on titles and ingredients" value={currentSearchText ? currentSearchText : ""}
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
}
