/**
 * Created by Daniel Schlaug on 2018-01-29.
 */
import React from "react";

export function DishPrintView({dish}) {
    return <>

        <img key="img" className="dish" src={dish.body.image}/>
        <h2 key="heading" className="capitaliseLabel"> {dish.name} </h2>
        <p>{dish.body.description}</p>

    </>
}
/*
<section key="preparations">
            <h4>Preparation</h4>
</section>
<table key="ingredients">
    <tbody>
    {dish.body.ingredients.map(ingredient =>
        <tr key={ingredient.name}>
            <td>{ingredient.quantity + " " + ingredient.unit}</td>
            <td className="capitaliseLabel">{ingredient.name}</td>
        </tr>)}
    </tbody>
</table>
<div key="spacer"/>
*/