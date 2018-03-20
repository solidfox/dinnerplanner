/**
 * Created by Daniel Schlaug on 2018-03-08.
 */

const scope = "";// "se.kth.dinnerplanner.siddaniel.";

export const types = {
    navigateToPage: scope + "navigateToPage",
    addDishToMenu: scope + "addDishToMenu",
    fetchedDish: scope + "fetchedDish",
    failedToFetchDish: scope + "failedToFetchDish",
    decreaseGuest: scope + "decreaseGuest",
    increaseGuest: scope + "increaseGuest",
    setGuest: scope + "setGuest",
    removeDishFromMenu: scope + "removeDishFromMenu",
    searchText: scope + "searchText",
    searchType: scope + "searchType",
};

export function navigateToPage(args) {
    let {page, id, name} = args;
    page = typeof args === 'string' ? args : page;
    return {
        type: types.navigateToPage,
        page: page,
        id: id,
        name: name
    }
}

export function fetchedDish(dish) {
    return {
        type: types.fetchedDish,
        dish: dish,
    }
}

export function searchText(string) {
    return {
        type: types.searchText,
        string: string,
    };
}

export function searchType(dishType) {
    return {
        type: types.searchType,
        dishType: dishType,
    }
}

export function failedToFetchDish({dishId, reason}) {
    return {
        type: types.failedToFetchDish,
        id: dishId,
        reason: reason
    }
}

export function addDishToMenu(dish) {
    return {
        type: types.addDishToMenu,
        dish: dish
    }
}

export function decreaseGuest() {
    return {
        type: types.decreaseGuest,
    }
}

export function increaseGuest() {
    return {
        type: types.increaseGuest,
    }
}

export function setGuest(nGuests) {
    return {
        type: types.setGuest,
        nGuests: Number.parseInt(nGuests),
    }
}

export function removeDishFromMenu(dishId) {
    return {
        type: types.removeDishFromMenu,
        dishId: dishId,
    }
}