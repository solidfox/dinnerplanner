/**
 * Created by Daniel Schlaug on 2018-03-08.
 */

import {Map, List, Set} from "immutable"
import * as Actions from "../Actions"
import * as core from "./core"
import {pages} from "./Pages"
import {types} from "../Actions";

export function reducer(state = core.initialState, action) {
    console.log("Reducing action");
    console.log(action);

    switch (action.type) {
        case Actions.types.clickedDish:
            const selectedDish = Map(action).delete('type');
            return core.setPage(state, pages.dishDetails, selectedDish);

        case Actions.types.addDishToMenu:
            return core.addDishToMenu(state, action.dish.id);

        case Actions.types.fetchedDish:
            return core.addDishToCache(state, action.dish);

        case Actions.types.navigateToPage:
            const page = action.page;
            console.log(page);
            return typeof page === 'string' ?
                core.setPage(state, action.page)
                : core.setSelectedDishId(
                    core.setPage(state, page.page),
                    page.selectedDishId);

        case Actions.types.decreaseGuest:
            return state.update('nGuests', (nGuests => nGuests - 1));

        case Actions.types.increaseGuest:
            return state.update('nGuests', (nGuests => nGuests + 1));

        case Actions.types.setGuest:
            return state.update('nGuests', (nGuests => action.nGuests));

        default:
            return state;
    }
}