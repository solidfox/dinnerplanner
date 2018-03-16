import {List, Map, Set} from "immutable";

/**
 * Created by Daniel Schlaug on 2018-03-13.
 */

export const initialState = Map({
    page: "select-dish",
    selectedDish: null,
    searchString: "",
    menu: Set(),
    dishCache: Map(),
    pendingSideEffects: List()
});

export function addDishToCache(state, dish) {
    return state.update('dishCache', dishCache =>
        dishCache.set(dish.id, dish));
}

export function getDish(state, dishId) {
    return state.getIn(['dishCache', dishId]);
}

export function addDishToMenu(state, dishId) {
    return state.update('menu', menu => menu.add(dishId));
}

export function setPage(state, page, selectedDish) {
    return state
        .set("page", page)
        .set("selectedDish", selectedDish);
}

export function getSelectedDishId(state) {
    return state.getIn(['selectedDish', 'id']);
}

export function getSelectedDish(state) {
    return getDish(state, getSelectedDishId(state));
}
