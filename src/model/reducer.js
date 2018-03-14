/**
 * Created by Daniel Schlaug on 2018-03-08.
 */

import {Map, List, Set} from "immutable"
import * as Actions from "../Actions"
import * as core from "./core"

export function reducer(state = core.initialState, action) {
    switch (action.type) {
        case Actions.types.clickedDish:
            const selectedDish = Map(action).delete('type');
            return core.setPage(state, "dish-details", selectedDish);

        case Actions.types.addDishToMenu:
            return core.addDishToMenu(state, action.dish.id);

        case Actions.types.fetchedDish:
            return core.addDishToCache(state, action.dish);

        default:
            return state;
    }
}