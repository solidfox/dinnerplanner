/**
 * Created by Daniel Schlaug on 2018-03-14.
 */

const pages = {
    welcome: "welcome",
    selectDish: "select-dish",
    dishDetails: "dish-details",
    dinnerOverview: "dinner-overview",
    printDinner: "print-dinner",
};

export default pages;

export function urlRouter(url) {
    const urlObject = new URL(url);
    return {
        page: pages[urlObject.pathname.split('/')[1]],
        selectedDishId: urlObject.searchParams.get('id')
    }
}