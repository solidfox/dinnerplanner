/**
 * Created by Daniel Schlaug on 2018-01-31.
 */

export default class MenuController {
    constructor(menuView, model) {
        menuView.nGuestsObservable.subscribe((newNGuests) => model.nGuests = newNGuests);
    }
}