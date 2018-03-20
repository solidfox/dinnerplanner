import React from "react";
import {decreaseGuest, increaseGuest, navigateToPage, removeDishFromMenu, setGuest} from "../Actions";
import {pages} from "../model/Pages";

function GuestCounter({dispatch, nGuests}) {
    return (
        <section className="input-group number-of-people-view">
            <div className="input-group-prepend">
                <label className="input-group-text">People</label>
                <button className="btn btn-secondary" id="decreaseNumberOfGuests"
                        onClick={() => dispatch(decreaseGuest())}> -
                </button>
            </div>
            <input className="form-control"
                   key="nGuests"
                   id="numberOfGuests"
                   value={nGuests}
                   type="number"
                   onChange={event => dispatch(setGuest(event.target.value))}/>
            <div className="input-group-append">
                <button className="btn btn-secondary" id="increaseNumberOfGuests"
                        onClick={() => dispatch(increaseGuest())}> +
                </button>
            </div>
        </section>
    )
}

function DishRow({dishName, dishId, nGuests, dispatch, dishCost}) {
    return (
        <tr>
            <td className="dish"
                onClick={() => dispatch(navigateToPage({page: pages.dishDetails, selectedDishId: dishId}))}>
                <div className="remove-icon" onClick={() => dispatch(removeDishFromMenu(dishId))}>
                    ❌
                </div>
                <div>{dishName}</div>
            </td>
            <td className="currency">
                {Math.round(dishCost * 100) / 100 * nGuests}
            </td>
        </tr>
    );
}

function MenuTable({removeDishSubject, nGuests, menuDishes, totalCost, dispatch}) {
    return (
        <table className="countTable center" width="100%">
            <thead>
            <tr>
                <th>Dish Name</th>
                <th align="right">Cost</th>
            </tr>
            </thead>
            <tbody className="menu-dishes">
            {
                menuDishes.map(dish =>
                    <DishRow removeDish={removeDishSubject}
                             dispatch={dispatch}
                             key={dish.id}
                             dishID={dish.id}
                             dishName={dish.name}
                             dishCost={dish.body.price}
                             nGuests={nGuests}
                    />)
            }
            </tbody>
            <tfoot>
            <tr>
                <th>{'Total for ' + nGuests + ' people: '}</th>
                <th className="currency" id="menuTotals">
                    {nGuests * Math.round(totalCost * 100) / 100}
                </th>
            </tr>
            </tfoot>
        </table>
    );
}


export default function Menu({nGuests, menuDishes, totalCost, dispatch}) {
    return (
        <article className="menu-view">
            <header data-toggle="collapse" data-target=".menu-body" aria-expanded="false">
                <h1>My Dinner</h1>
                <h1>
                    ≣
                </h1>
            </header>
            <section className="collapse show menu-body">
                <GuestCounter nGuests={nGuests} dispatch={dispatch}/>
                {menuDishes.size !== 0 ?
                    <>
                        <MenuTable key={'menutable'}
                                   nGuests={nGuests}
                                   menuDishes={menuDishes}
                                   totalCost={totalCost}
                                   dispatch={dispatch}
                        />
                        <button key={'button'}
                                className="btn btn-primary btn-lg btn-block"
                                id="confirm-dinner"
                                onClick={() => dispatch(navigateToPage(pages.dinnerOverview))}>
                            Confirm Dinner</button>
                    </> : <>
                        <button key="no dishes in menu" className="btn btn-secondary btn-lg btn-block" disabled
                                id="confirm-dinner">
                            No Dishes in Menu </button>
                        <p key="comment" className="helpText">
                            You can search & select dishes. Once you find a dish you like, you can add it to the menu.
                        </p>
                    </>

                }
            </section>
        </article>
    )
}