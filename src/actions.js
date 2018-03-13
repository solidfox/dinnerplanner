/**
 * Created by Daniel Schlaug on 2018-03-08.
 */

export const types = {
    clickedDish: "clickedDish"
};

export function clickedDish(dishId) {
    return {
        type: types.clickedDish,
        dishId: dishId
    }
}