/**
 * Created by Daniel Schlaug on 2018-01-29.
 */

export function createDishPrintView(document, dish) {
    let wrapper = document.createElement("article");

    let image = document.createElement("img");
    image.src = "/images/" + dish.image;
    wrapper.appendChild(image);

    let firstColumn = document.createElement("div");
    wrapper.appendChild(firstColumn);

    let title = document.createElement("h3");
    title.textContent = dish.name;
    firstColumn.appendChild(title);

    let ingredients = document.createElement("table");
    dish.ingredients.forEach((ingredient => {
        let ingredientRow = document.createElement("tr");
        let name = document.createElement("td");
        name.textContent = ingredient.name;
        ingredientRow.appendChild(name);
        let quantity = document.createElement("td");
        quantity.textContent = ingredient.quantity + " " + ingredient.unit;
        ingredientRow.appendChild(quantity);
        ingredients.appendChild(ingredientRow);
    }))
    firstColumn.appendChild(ingredients);

    let secondColumn = document.createElement("div");
    wrapper.appendChild(secondColumn);

    let preparationTitle = document.createElement("h4");
    preparationTitle.textContent = "Preparation";
    secondColumn.appendChild(preparationTitle);

    let preparationText = document.createElement("p");
    preparationText.textContent = dish.description;
    secondColumn.appendChild(preparationText);

    return wrapper
}