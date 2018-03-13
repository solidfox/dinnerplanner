/**
 * Created by Daniel Schlaug on 2018-03-08.
 */

import * as Immutable from "immutable";
import * as Actions from "../actions";

export const initialState = Immutable.Map({
    page: "select-dish",
    selectedDish: null,
    searchString: "",
    menu: []
});

export function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.types.clickedDish:
            const newState = state
                .set("page", "dish-details")
                .set("selectedDish", action.dishId);
            console.log("Swapped state");
            return newState;
        default:
            return state;
    }
}