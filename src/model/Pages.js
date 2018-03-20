/**
 * Created by Daniel Schlaug on 2018-03-14.
 */

export const pages = {
    welcome: "welcome",
    selectDish: "select-dish",
    dishDetails: "dish-details",
    dinnerOverview: "dinner-overview",
    printDinner: "print-dinner",
};

export function urlRouter(url) {
    const urlObject = new URL(url);
    return {
        page: urlObject.pathname.split('/')[1],
        id: urlObject.searchParams.get('id')
    }
}