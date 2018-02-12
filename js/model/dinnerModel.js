import Rx from "rxjs/Rx";

export function totalCostOfDish(dish) {
	return dish.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)
}

//DinnerModel Object constructor
export default class DinnerModel {

    get nGuestsObservable() { return this._numberOfGuestsSubject; }
    get nGuests() { return this._nGuests; }
    set nGuests(nGuests) {
        this._nGuests = nGuests;
        this._numberOfGuestsSubject.next(this.nGuests);
    }

    get dishes() { return Object.create(this._dishes); }

    get selectedDishesObservable() { return this._selectedDishesSubject; }
    get selectedDishes() { return Object.create(this._selectedDishes); }

    get allIngredients() {
        let lists_of_ingredients = this.selectedDishes.map(function (dish) {
            return dish.ingredients;
        });
        return [].concat(lists_of_ingredients);
    }

    get totalMenuCost() {
        return this.nGuests * this._selectedDishes.reduce((acc, dish) => acc + totalCostOfDish(dish), 0);
    }

    addDishToMenu(id) {
        let newDish = this.getDish(id);
        this._selectedDishes = this.selectedDishes.filter(dish => dish.type !== newDish.type);
        this._selectedDishes.push(newDish);
        this._selectedDishesSubject.next(this.selectedDishes);
    }

    removeDishFromMenu(id) {
        this._selectedDishes = this._selectedDishes.filter(dish => dish.id !== id);
        this._selectedDishesSubject.next(this.selectedDishes);
    }

    getDish(id) {
        for (let key in this._dishes) {
            let dish = this._dishes[key];
            if (dish.id === id) {
                return dish;
            }
        }
    }

    //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
    //you can use the filter argument to filter out the dish by name or ingredient (use for search)
    //if you don't pass any filter all the dishes will be returned
    filteredDishes(type = 'all', filter) {
        return this._dishes.filter(dish => {
            let searchTarget = dish.ingredients
                .map(x => x.name)
                .concat([dish.name])
                .join(" ")
                .toLocaleLowerCase();

            let found = filter === undefined || searchTarget.indexOf(filter.toLowerCase()) !== -1;

            let typeMatch = type === 'all' || dish.type === type;

            return typeMatch && found;
        });
    }

    constructor() {
        this._selectedDishes = [];
        this._selectedDishesSubject = new Rx.BehaviorSubject(this._selectedDishes);

        this._nGuests = 2;
        this._numberOfGuestsSubject = new Rx.BehaviorSubject(this.nGuests);


        // the dishes variable contains an array of all the
        // dishes in the database. each dish has id, name, type,
        // image (name of the image file), description and
        // array of ingredients. Each ingredient has name,
        // quantity (a number), price (a number) and unit (string
        // defining the unit i.e. "g", "slices", "ml". Unit
        // can sometimes be empty like in the example of eggs where
        // you just say "5 eggs" and not "5 pieces of eggs" or anything else.
        this._dishes = [{
            'id': 1,
            'name': 'French toast',
            'type': 'starter',
            'image': 'toast.jpg',
            'description': "In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
            'ingredients': [{
                'name': 'eggs',
                'quantity': 0.5,
                'unit': '',
                'price': 10
            }, {
                'name': 'milk',
                'quantity': 30,
                'unit': 'ml',
                'price': 6
            }, {
                'name': 'brown sugar',
                'quantity': 7,
                'unit': 'g',
                'price': 1
            }, {
                'name': 'ground nutmeg',
                'quantity': 0.5,
                'unit': 'g',
                'price': 12
            }, {
                'name': 'white bread',
                'quantity': 2,
                'unit': 'slices',
                'price': 2
            }]
        }, {
            'id': 2,
            'name': 'Sourdough Starter',
            'type': 'starter',
            'image': 'sourdough.jpg',
            'description': "Here is how you make it... Lore ipsum...",
            'ingredients': [{
                'name': 'active dry yeast',
                'quantity': 0.5,
                'unit': 'g',
                'price': 4
            }, {
                'name': 'warm water',
                'quantity': 30,
                'unit': 'ml',
                'price': 0
            }, {
                'name': 'all-purpose flour',
                'quantity': 15,
                'unit': 'g',
                'price': 2
            }]
        }, {
            'id': 3,
            'name': 'Baked Brie with Peaches',
            'type': 'starter',
            'image': 'bakedbrie.jpg',
            'description': "Here is how you make it../**/. Lore ipsum...",
            'ingredients': [{
                'name': 'round Brie cheese',
                'quantity': 10,
                'unit': 'g',
                'price': 8
            }, {
                'name': 'raspberry preserves',
                'quantity': 15,
                'unit': 'g',
                'price': 10
            }, {
                'name': 'peaches',
                'quantity': 1,
                'unit': '',
                'price': 4
            }]
        }, {
            'id': 100,
            'name': 'Meat balls',
            'type': 'main dish',
            'image': 'meatballs.jpg',
            'description': "Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
            'ingredients': [{
                'name': 'extra lean ground beef',
                'quantity': 115,
                'unit': 'g',
                'price': 20
            }, {
                'name': 'sea salt',
                'quantity': 0.7,
                'unit': 'g',
                'price': 3
            }, {
                'name': 'small onion, diced',
                'quantity': 0.25,
                'unit': '',
                'price': 2
            }, {
                'name': 'garlic salt',
                'quantity': 0.7,
                'unit': 'g',
                'price': 2
            }, {
                'name': 'Italian seasoning',
                'quantity': 0.6,
                'unit': 'g',
                'price': 3
            }, {
                'name': 'dried oregano',
                'quantity': 0.3,
                'unit': 'g',
                'price': 3
            }, {
                'name': 'crushed red pepper flakes',
                'quantity': 0.6,
                'unit': 'g',
                'price': 3
            }, {
                'name': 'Worcestershire sauce',
                'quantity': 6,
                'unit': 'ml',
                'price': 7
            }, {
                'name': 'milk',
                'quantity': 20,
                'unit': 'ml',
                'price': 4
            }, {
                'name': 'grated Parmesan cheese',
                'quantity': 5,
                'unit': 'g',
                'price': 8
            }, {
                'name': 'seasoned bread crumbs',
                'quantity': 15,
                'unit': 'g',
                'price': 4
            }]
        }, {
            'id': 101,
            'name': 'MD 2',
            'type': 'main dish',
            'image': 'bakedbrie.jpg',
            'description': "Here is how you make it... Lore ipsum...",
            'ingredients': [{
                'name': 'ingredient 1',
                'quantity': 1,
                'unit': 'pieces',
                'price': 8
            }, {
                'name': 'ingredient 2',
                'quantity': 15,
                'unit': 'g',
                'price': 7
            }, {
                'name': 'ingredient 3',
                'quantity': 10,
                'unit': 'ml',
                'price': 4
            }]
        }, {
            'id': 102,
            'name': 'MD 3',
            'type': 'main dish',
            'image': 'meatballs.jpg',
            'description': "Here is how you make it... Lore ipsum...",
            'ingredients': [{
                'name': 'ingredient 1',
                'quantity': 2,
                'unit': 'pieces',
                'price': 8
            }, {
                'name': 'ingredient 2',
                'quantity': 10,
                'unit': 'g',
                'price': 7
            }, {
                'name': 'ingredient 3',
                'quantity': 5,
                'unit': 'ml',
                'price': 4
            }]
        }, {
            'id': 103,
            'name': 'MD 4',
            'type': 'main dish',
            'image': 'meatballs.jpg',
            'description': "Here is how you make it... Lore ipsum...",
            'ingredients': [{
                'name': 'ingredient 1',
                'quantity': 1,
                'unit': 'pieces',
                'price': 4
            }, {
                'name': 'ingredient 2',
                'quantity': 12,
                'unit': 'g',
                'price': 7
            }, {
                'name': 'ingredient 3',
                'quantity': 6,
                'unit': 'ml',
                'price': 4
            }]
        }, {
            'id': 200,
            'name': 'Chocolat Ice cream',
            'type': 'dessert',
            'image': 'icecream.jpg',
            'description': "Here is how you make it... Lore ipsum...",
            'ingredients': [{
                'name': 'ice cream',
                'quantity': 100,
                'unit': 'ml',
                'price': 6
            }]
        }, {
            'id': 201,
            'name': 'Vanilla Ice cream',
            'type': 'dessert',
            'image': 'icecream.jpg',
            'description': "Here is how you make it... Lore ipsum...",
            'ingredients': [{
                'name': 'ice cream',
                'quantity': 100,
                'unit': 'ml',
                'price': 6
            }]
        }, {
            'id': 202,
            'name': 'Strawberry',
            'type': 'dessert',
            'image': 'icecream.jpg',
            'description': "Here is how you make it... Lore ipsum...",
            'ingredients': [{
                'name': 'ice cream',
                'quantity': 100,
                'unit': 'ml',
                'price': 6
            }]
        }
        ];

    }
}