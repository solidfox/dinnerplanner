/**
 * Created by Daniel Schlaug on 2018-01-29.
 */
import React from "react";

export function DishPrintView({dish}) {
    return [
        <img className="dish"> {dish.image} </img>,
        <h2 className="capitaliseLabel"> {dish.name} </h2>,
        <table>
            {dish.ingredients.map(ingredient => <tr>
                <td>{ingredient.quantity + " " + ingredient.unit}</td>
                <td className="capitaliseLabel">{ingredient.name}</td>
            </tr>)}
        </table>,
        <section>
            <h4>Preparation</h4>
            <p>{dish.description}</p>
        </section>,
        <div/>,
    ]
    
}