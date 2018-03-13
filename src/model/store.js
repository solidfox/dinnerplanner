/**
 * Created by Daniel Schlaug on 2018-03-08.
 */

import {Map, List} from "immutable";
import * as Actions from "../actions";

export const initialState = Map({
    page: "select-dish",
    selectedDish: null,
    searchString: "",
    menu: List()
});

export function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.types.clickedDish:
            return state
                .set("page", "dish-details")
                .set("selectedDish", Map(action).delete('type'));
        case Actions.types.addDishToMenu:
            return state.update('menu', menu => menu.push(action.dish));
        default:
            return state;
    }
}