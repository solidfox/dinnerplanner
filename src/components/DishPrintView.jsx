/**
 * Created by Daniel Schlaug on 2018-01-29.
 */
import React from "react";
export class CreateDishPrintView extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return [
                <img className="dish"> {this.props.dish.image} </img>,
                <h2 className="capitaliseLabel"> {this.props.dish.name} </h2>,
                <table>
                    {this.props.dish.ingredients.map( ingredient => <tr>
                    <td>{ingredient.quantity + " " + ingredient.unit}</td>
                    <td className="capitaliseLabel">{ingredient.name}</td>
                    </tr>)}
                </table>,
                <section>
                    <h4>Preparation</h4>
                    <p>{this.props.dish.description}</p>
                </section>,
                <div></div>,
            ]
    }
}

/*
export default function createDishPrintView(document, dish) {
    let elements = [];

    let image = document.createElement("img");
    image.classList.add("dish");
    image.src = dish.image;
    elements.push(image);

    let title = document.createElement("h2");
    title.textContent = dish.name;
    title.classList.add('capitaliseLabel');
    elements.push(title);

    let ingredients = document.createElement("table");
    dish.ingredients.forEach((ingredient => {
        let ingredientRow = document.createElement("tr");
        let quantity = document.createElement("td");
        quantity.textContent = ingredient.quantity + " " + ingredient.unit;
        ingredientRow.appendChild(quantity);
        ingredients.appendChild(ingredientRow);
        let name = document.createElement("td");
        name.textContent = ingredient.name;
        name.classList.add('capitaliseLabel');
        ingredientRow.appendChild(name);

    }))
    elements.push(ingredients);

    let secondColumn = document.createElement("section");
    elements.push(secondColumn);

    let preparationTitle = document.createElement("h4");
    preparationTitle.textContent = "Preparation";
    secondColumn.appendChild(preparationTitle);

    let preparationText = document.createElement("p");
    preparationText.textContent = dish.description;
    secondColumn.appendChild(preparationText);

    let spacer = document.createElement("div");
    elements.push(spacer);

    return elements;
}
*/