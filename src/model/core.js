import {List, Map, Set} from "immutable";

/**
 * Created by Daniel Schlaug on 2018-03-13.
 */

export const initialState = Map({
    page: "select-dish",
    selectedDish: null,
    searchString: "",
    dishTypes: ["all dishes", "main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "drink"],
    menu: Set(),
    dishCache: Map(),
    pendingSideEffects: List()
});

export function addDishToCache(state, dish) {
    return state.update('dishCache', dishCache =>
        dishCache.set(dish.id + "", dish));
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

export function getBestInformationOnSelectedDish(state) {
    console.log(getFullDataOnSelectedDish(state));
    return getFullDataOnSelectedDish(state) || state.get('selectedDish');
}

export function setSelectedDishId(state, dishId) {
    return getSelectedDishId(state) ? state.setIn(['selectedDish', 'id'], dishId)
        : state.set('selectedDish', Map({id: dishId}));
}

export function getSelectedDishId(state) {
    return state.getIn(['selectedDish', 'id']);
}

export function getFullDataOnSelectedDish(state) {
    return getDish(state, getSelectedDishId(state));
}
