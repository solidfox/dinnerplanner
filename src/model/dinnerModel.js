import Rx from "rxjs/Rx";
import * as Keys from "./keys";

//DinnerModel Object constructor
export default class DinnerModel {

    get nGuests() {
        return this._nGuests;
    }

    set nGuests(nGuests) {
        this._nGuests = nGuests;
        this._numberOfGuestsSubject.next(this.nGuests);
    }

    get selectedDishesObservable() {
        return this._selectedDishesSubject;
    }

    get selectedDishes() {
        return Object.create(this._selectedDishes);
    }

    get allIngredients() {
        let lists_of_ingredients = this.selectedDishes.map(function (dish) {
            return dish.ingredients;
        });
        return [].concat(lists_of_ingredients);
    }

    get totalMenuCost() {
        return this.nGuests * this._selectedDishes.reduce((acc, dish) => acc + dish.price, 0);
    }

    addDishToMenu(dish) {
        let newDish = dish;
        this._selectedDishes = this._selectedDishes.filter(dish => dish.id !== newDish.id);
        this._selectedDishes.push(newDish);
        this._selectedDishesSubject.next(this.selectedDishes);
    }

    removeDishFromMenu(id) {
        this._selectedDishes = this._selectedDishes.filter(dish => dish.id !== id);
        this._selectedDishesSubject.next(this.selectedDishes);
    }

    /*
        getDish(id) {
            for (let key in this._dishes) {
                let dish = this._dishes[key];
                if (dish.id === id) {
                    return dish;
                }
            }
        }*/

    //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
    //you can use the filter argument to filter out the dish by name or ingredient (use for search)
    //if you don't pass any filter all the dishes will be returned
    filteredDishes(type = undefined, filter) {
        type = type === 'all' ? undefined : type;
        return fetch(apiEndpoint(
            "search",
            {
                type: type,
                filter: filter
            }),
            {
                headers: new Headers({
                    "X-Mashape-Key": Keys.spoonacular
                })
            })
            .then((response) => response.json())
            .then((json) => json.results.map((result) => ({
                    id: result.id.toString(),
                    name: result.title,
                    image: json.baseUri + result.image
                }))
            );
    }

    constructor() {
        this._selectedDishes = [];
        this._selectedDishesSubject = new Rx.BehaviorSubject(this._selectedDishes);

        this.selectedDishesObservable.subscribe(console.log);

        this._nGuests = 2;
        this._numberOfGuestsSubject = new Rx.BehaviorSubject(this.nGuests);

    }
}


function apiEndpoint(dataType, params) {
    let endpoint = new URL("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/");
    switch (dataType) {
        case "dishDetails":
            endpoint.pathname = "/recipes/" + params.dishID + "/information";
            endpoint.searchParams.append("includeNutrition", 'false');
            break;
        case "search":
            endpoint.pathname = "/recipes/search";
            if (params.type) {
                endpoint.searchParams.append("type", params.type)
            }
            if (params.filter) {
                endpoint.searchParams.append("query", params.filter)
            }
            break;
    }
    return endpoint.toString();
}

const shorterUnit = {
    tablespoons: "tbsp",
    tablespoon: "tbsp",
    teaspoons: "tsp",
    teaspoon: "tsp",
};

export function fetchDish(id) {
    if (!id) {
        return new Promise((resolve, reject) => {
            reject("No id passed.");
        })
    }
    const endpoint = apiEndpoint("dishDetails", {dishID: id});

    return fetch(endpoint,
        {
            headers: new Headers({
                "X-Mashape-Key": Keys.spoonacular
            })
        })
        .then(response => response.json())
        .then(json => ({
            id: json.id.toString(),
            name: json.title,
            body: {
                type: json.dishTypes,
                image: json.image,
                price: json.pricePerServing / 100,
                description: json.instructions,
                sourceURL: json.spoonacularSourceUrl,
                score: json.healthScore,
                cookTime: json.cookingMinutes,
                prepTime: json.preparationMinutes,
                readyTime: json.readyInMinutes,
                credit: json.creditText,
                veg: json.vegetarian,
                ingredients: json.extendedIngredients.map((ingredient) => ({
                    name: ingredient.name,
                    quantity: ingredient.amount,
                    unit: shorterUnit[ingredient.unit] || ingredient.unit,
                    price: "0.00"
                }))
            }
        }))

}