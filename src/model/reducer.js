/**
 * Created by Daniel Schlaug on 2018-03-08.
 */

import {Map, List, Set} from "immutable"
import * as Actions from "../Actions"
import * as core from "./core"
import {pages} from "./Pages"
import {types} from "../Actions"
import * as Immutable from "immutable"
import {searchKey} from "./core";

function validState(state) {
    return Object.getPrototypeOf(Immutable.Map()).isPrototypeOf(state);
}

export function reducer(state, action) {
    state = validState(state) ? state : core.initialState;
    console.log("---------- Reducing action -----------");
    console.log(action);

    switch (action.type) {

        case Actions.types.addDishToMenu:
            return core.addDishToMenu(state, action.dish.id);

        case Actions.types.searchText:
            return state.set('searchText', action.string);

        case Actions.types.searchType:
            return state.set('searchType', action.dishType);

        case Actions.types.removeDishFromMenu:
            return core.removeDishFromMenu(state, action.dishId);

        case Actions.types.fetchedDish:
            return core.addDishToCache(state, action.dish);

        case Actions.types.navigateToPage:
            const page = action.page;
            let thread = core.setPage(state, action.page);
            thread = core.setSelectedDish(thread, Map({id: action.id ,name: action.name}));
            return thread;

        case Actions.types.decreaseGuest:
            return state.update('nGuests', (nGuests => nGuests - 1));

        case Actions.types.increaseGuest:
            return state.update('nGuests', (nGuests => nGuests + 1));

        case Actions.types.setGuest:
            return state.update('nGuests', (() => action.nGuests));

        case Actions.types.cacheFoundDishes:
            return state.setIn(["foundDishes", action.searchKey], action.foundDishes);

        default:
            return state;
    }
}