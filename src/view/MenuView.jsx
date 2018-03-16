import Rx from "rxjs/Rx";
import ResponsiveDesign from "../ResponsiveDesign";
import React from "react";
import {decreaseGuest, increaseGuest, navigateToPage} from "../Actions";
import {pages} from "../model/Pages";

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
// export class MenuView extends View {
//
//     constructor(containerElement, model) {
//         super(containerElement);
//
//         this._nGuestsSubject = new Rx.BehaviorSubject(model.nGuests);
//         this._removeDishSubject = new Rx.Subject();
//
//         let interestingChanges =
//             model.nGuestsObservable.distinctUntilChanged().combineLatest(
//                 model.selectedDishesObservable.distinctUntilChanged(),
//                 (nGuests, selectedDishes) => {
//                     return {
//                         nGuests: nGuests,
//                         selectedDishes: selectedDishes,
//                         totalCost: model.totalMenuCost,
//                         dishTypes: model.dishTypes
//                     };
//                 }
//             );
//
//         interestingChanges.subscribe(event => this.render(event));
//     }
//
//     render({selectedDishes, nGuests, totalCost, dishTypes}) {
//         this.clear();
//         console.log("Rendering");
//         let rendering = createMenu({
//             document: document,
//             removeDishSubject: this._removeDishSubject,
//             nGuests: nGuests,
//             selectedDishes: selectedDishes,
//             totalCost: totalCost,
//             dishTypes: dishTypes
//         });
//         rendering.elements.forEach(element => {
//             this.containerElement.appendChild(element)
//         });
//         rendering.observables.nGuestsInput.subscribe(this._nGuestsSubject);
//
//         this._nGuestsSubject.sample(rendering.observables.minusClick)
//             .map(nGuests => Math.max(nGuests - 1, 1))
//             .subscribe(this._nGuestsSubject);
//
//         this._nGuestsSubject.sample(rendering.observables.plusClick)
//             .map(nGuests => nGuests + 1)
//             .subscribe(this._nGuestsSubject);
//
//     }
//
//     clear() {
//         this.containerElement.innerHTML = "";
//     }
//
//     get removeDishObservable() {
//         return this._removeDishSubject;
//     }
//
//     get nGuestsObservable() {
//         return this._nGuestsSubject;
//     }
//
// }

function GuestCounter(props) {
    return (
        <section className="input-group number-of-people-view">
            <div className="input-group-prepend">
                <label className="input-group-text">People</label>
                <button className="btn btn-secondary" id="decreaseNumberOfGuests"
                        onClick={() => props.dispatch(decreaseGuest())}> -
                </button>
            </div>
            <input className="form-control" id="numberOfGuests" value={props.nGuests} type="number"/>
            <div className="input-group-append">
                <button className="btn btn-secondary" id="increaseNumberOfGuests"
                        onClick={() => props.dispatch(increaseGuest())}> +
                </button>
            </div>
        </section>
    )
}

function DishRow(props) {
    return (
        <tr>
            <td className="capitaliseLabel" onClick={window.location.hash = '#dish-details@' + props.dishID}>
                {props.dishName}</td>
            <td className="crossEmoji" onClick={props.removeDish.next(props.dishID)}> // Remove Dish Here
                ❌
            </td>
            <td className="currency">
                {String(Math.round(props.dishCost * 100) / 100 * props.nGuests)}
            </td>
        </tr>
    );
}

function MenuTable (removeDishSubject, nGuests, selectedDishes, totalCost)
{
     return (
            <table className="countTable center" width="100%">
                <thead>
                <tr>
                    <th>Dish Name</th>
                    <th></th>
                    <th align="right">Cost</th>
                </tr>
                </thead>
                <tbody id="menuDishes"> {
                    selectedDishes.map(dish =>
                        <DishRow removeDish={removeDishSubject}
                                 dishID={dish.id}
                                 dishName={dish.name}
                                 dishCost={dish.price} nGuests={nGuests}
                        />)
                } </tbody>
                <tfoot>
                <tr>
                    <th>{'Total for ' + nGuests + ' people: '}</th>
                    <th className="currency" id="menuTotals">
                        {Math.round(totalCost * 100) / 100}
                    </th>
                </tr>
                </tfoot>
            </table>
        );
}


export default function Menu({
                                 removeDishSubject: removeDishSubject,
                                 nGuests: nGuests,
                                 selectedDishes: selectedDishes,
                                 totalCost: totalCost,
                                 dishTypes,
                                 dispatch
                             }) {
    return (
        <article>
            <header data-toggle="collapse" data-target=".menu-body" aria-expanded="false">
                <h1>My Dinner</h1>
                <h1 className="only-when-collapsed currency">
                    {Math.round(totalCost * 100) / 100 + ' ≣'}
                </h1>
            </header>
            <section className="collapse show menu-body">
                <GuestCounter nGuests={nGuests} dispatch={dispatch}/>
                {selectedDishes.length !== 0 ?
                    [
                        <MenuTable removeDishSubject={removeDishSubject}
                                   nGuests={nGuests}
                                   dish={dish}
                                   selectedDishes={selectedDishes}
                                   totalCost={totalCost}
                        />,
                        <button className="btn btn-secondary btn-lg btn-block"
                                id="confirm-dinner"
                                onClick={() => dispatch(navigateToPage(pages.dinnerOverview))}>
                            Confirm Dinner</button>,
                    ] : [
                        <button className="btn btn-secondary btn-lg btn-block" disabled id="confirm-dinner">
                            No Dished in Menu </button>,
                        <p className="hemlText">
                            You can search & select dishes. Once you find a dish you like, you can add it to the menu.
                        </p>
                    ]

                }
            </section>
        </article>
    )
}