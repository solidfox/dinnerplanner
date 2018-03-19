import React from "react";
import LoadingArticle from "../components/LoadingArticle.jsx";
import {addDishToMenu, navigateToPage} from "../Actions";
import {pages} from "../model/Pages";

<<<<<<< Updated upstream
function IngredientsRow({ingredient, nGuests}) {
=======
function extractId(searchString) {
    return Number(searchString.split("@")[1]);
}

/** MenuView Object constructor
 *
 * This object represents the code for one specific view (in this case the Example view).
 *
 * It is responsible for:
 * - constructing the view (e.g. if you need to create some HTML elements procedurally)
 * - populating the view with the data
 * - updating the view when the data changes
 *
 * You should create a view Object like this for every view in your UI.
 *
 * @param {jQuery object} container - references the HTML parent element that contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */

//         let dishObservable = idObservable
//             .filter(maybeId => maybeId > 0)
//             .do(console.log)
//             .flatMap(id => Rx.Observable
//                 .fromPromise(model.getDish(id))
//                 .pipe(catchError(error => window.alert(`Error fetching dish: ${error}`)))
//             );


function CreateIngredientsRow(props) {
>>>>>>> Stashed changes
    return (
        <tr>
            <td>{nGuests * Math.round(ingredient.quantity * 100) / 100 + ' ' + ingredient.unit}</td>
            <td className="capitaliseLabel">{ingredient.name}</td>
        </tr>
    );
}

<<<<<<< Updated upstream
export default function DishDetails({dish, nGuests, dispatch}) {

=======
export default function DishDetails({
                                       dish,
                                       nGuests,
                                       dispatch
                                   }) {

    console.log();
>>>>>>> Stashed changes
    const body = !dish.body ? <LoadingArticle/> : [
        // ----------- Image -----------
        <section key="picture" className="picture">
            <img className="imageDish" src={dish.body.image}
                 title={dish.name + ' - ' + dish.body.credit}/>
        </section>,
        // ----------- Preparation ------------
        <section key="preparation" className="preparation">
            <h4 className="softHeading">Description & Preparation</h4>
            <h6 className="capitaliseLabel"> {
                'Ready in ' + dish.body.readyTime + ' mins • Health Score: '
                + dish.body.score + '/100 • ' + dish.body.type} </h6>
            <br/>
            <p>{dish.body.description}</p>
            <a href={dish.body.sourceURL} target='_blank'> View More Details > </a>
        </section>,
        // ----------- Ingredients ------------
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
        </section>,
    ];

    return (
        <article id="dish-details-view">
            {/*-----------  Button ------------*/}
            <button className="backToSearch btn btn-warning"
                    onClick={() => dispatch(navigateToPage(pages.selectDish))}>
                Back to Search</button>
            {/*----------- Title ------------*/}
            <section className="dishName">
                <h1 className="capitaliseLabel">{dish.name || dish.body && dish.body.name || ""}</h1>
            </section>
            {body}
        </article>);
}
