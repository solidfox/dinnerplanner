import {List, Map, Set} from "immutable";

/**
 * Created by Daniel Schlaug on 2018-03-13.
 */

export const initialState = Map({
    page: "select-dish",
    selectedDish: null,
    searchString: "",
    searchType: "all dishes",
    foundDishes: Map(),
    dishTypes: ["all dishes", "main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "drink"],
    menu: Set(),
    dishCache: Map(),
    pendingSideEffects: List(),
    nGuests: 2
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

export function removeDishFromMenu(state, dishId) {
    return state.update('menu', menu => menu.remove(dishId));
}

export function setPage(state, page) {
    return state
        .set("page", page);
}

export function getBestInformationOnSelectedDish(state) {
    return getFullDataOnSelectedDish(state) || state.get('selectedDish');
}

export function setSelectedDish(state, dish) {
    return state.set('selectedDish', Map(dish));
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

export function getMenuDishes(state) {
    return state.get('menu').map(dishId => getDish(state, dishId) || dishId)
}

export function getTotalMenuCost(state) {
    return getMenuDishes(state)
        .reduce((acc, dish) => acc + dish.body.price, 0);
}

export function round(value) {
    return Math.round(value * 100) / 100;
}

export function searchParametersChanged(oldState, newState) {
    return (
        oldState && oldState.get('searchString') !== newState.get('searchString') ||
        oldState && oldState.get('searchType') !== newState.get('searchType')
    );
}