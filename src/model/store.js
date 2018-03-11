/**
 * Created by Daniel Schlaug on 2018-03-08.
 */

import * as Immutable from "immutable";
import * as Actions from "../actions";
import * as Redux from "redux";

const initialState = Immutable.Map({
    page: "",
    selectedDish: null,
    searchString: "",
    menu: []
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.clickedDish:
            const newState = state
                .assoc("page", "dish-details")
                .assoc("selectedDish", action.dishId);
            console.log(newState.toJS());
            return newState;
    }
}

export const store = Redux.createStore(reducer);