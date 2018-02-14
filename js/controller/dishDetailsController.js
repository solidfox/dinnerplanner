/**
 * Created by Daniel Schlaug on 2018-01-31.
 */

export default class DishDetailsController {
    constructor(view, model) {
        view.addToMenuObservable.subscribe(dish => model.addDishToMenu(dish.id))
    }
}