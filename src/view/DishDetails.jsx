import React from "react";
import LoadingArticle from "../components/LoadingArticle.jsx";
import {addDishToMenu, navigateToPage} from "../Actions";
import {pages} from "../model/Pages";

function IngredientsRow({ingredient, nGuests}) {
    return (
        <tr>
            <td>{nGuests * Math.round(ingredient.quantity * 100) / 100 + ' ' + ingredient.unit}</td>
            <td className="capitaliseLabel">{ingredient.name}</td>
        </tr>
    );
}

export default function DishDetails({dish, nGuests, dispatch}) {

    const body = !dish.body ? <LoadingArticle/>
        : <>
            <section key="picture" className="picture">
                <img className="imageDish" src={dish.body.image}
                     title={dish.name + ' - ' + dish.body.credit}/>
            </section>

            <section key="preparation" className="preparation">
                <h4 className="softHeading">Description & Preparation</h4>
                <h6 className="capitaliseLabel"> {
                    'Ready in ' + dish.body.readyTime + ' mins • Health Score: '
                    + dish.body.score + '/100 • ' + dish.body.type} </h6>
                <br/>
                <p>{dish.body.description}</p>
                <a href={dish.body.sourceURL} target='_blank'> View More Details > </a>
            </section>

            <section key="ingredients" className="ingredients" id="ingredients-table">
                <button className="btn btn-danger btn-lg btn-block selectButton"
                        onClick={() => dispatch(addDishToMenu(dish))}>
                    {`Add to Menu ($${Math.round(nGuests * dish.body.price * 100) / 100})`}
                </button>
                <table className='ingredients countTable center'>
                    <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Ingredients</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dish.body.ingredients
                        .map(ingredient => <IngredientsRow key={ingredient.name}
                                                           ingredient={ingredient}
                                                           nGuests={nGuests}/>)}
                    </tbody>
                </table>
            </section>
        </>;

    return (
        <article id="dish-details-view">
            {/*-----------  Button ------------*/}
            <button className="backToSearch btn btn-warning"
                    onClick={() => dispatch(navigateToPage(pages.selectDish))}>
                Back to Search
            </button>
            {/*----------- Title ------------*/}
            <section className="dishName">
                <h1 className="capitaliseLabel">{dish.name || dish.body && dish.body.name || ""}</h1>
            </section>
            {body}
        </article>);
}
