/**
 * Created by Daniel Schlaug on 2018-03-08.
 */

const scope = "se.kth.dinnerplanner.siddaniel.";

export const types = {
    navigateToPage: scope + "navigateToPage",
    clickedDish: scope + "clickedDish",
    addDishToMenu: scope + "addDishToMenu",
    fetchedDish: scope + "fetchedDish",
    failedToFetchDish: scope + "failedToFetchDish",
    decreaseGuest: scope + "decreaseGuest",
    increaseGuest: scope + "increaseGuest",
    setGuest: scope + "setGuest",
};

export function clickedDish({dishId, dishName}) {
    return {
        type: types.clickedDish,
        name: dishName,
        id: dishId,
    }
}

export function navigateToPage(page) {
    return {
        type: types.navigateToPage,
        page: page,
    }
}

export function navigateToRoute() {

}

export function fetchedDish(dish) {
    return {
        type: types.fetchedDish,
        dish: dish,
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

export function setGuest() {
    return {
        type: types.setGuest,
    }
}