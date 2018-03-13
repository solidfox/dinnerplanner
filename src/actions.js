/**
 * Created by Daniel Schlaug on 2018-03-08.
 */

const scope = "se.kth.dinnerplanner.siddaniel.";

export const types = {
    clickedDish: scope + "clickedDish",
    addDishToMenu: scope + "addDishToMenu"
};

export function clickedDish({dishId, dishName}) {
    return {
        type: types.clickedDish,
        name: dishName,
        id: dishId,
    }
}

export function addDishToMenu(dish) {
    return {
        type: types.addDishToMenu,
        dish: dish
    }
}