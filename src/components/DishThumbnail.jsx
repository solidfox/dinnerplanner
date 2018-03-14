/**
 * Created by Daniel Schlaug on 2018-01-29.
 */
import React from "react";
import {clickedDish} from "../Actions";


export default function DishThumbnail({
                                          title,
                                          dishId,
                                          imageURL,
                                          cost,
                                          dispatch,
                                      }) {
    return (
        <li key={dishId}
            className="dish"
            onClick={dishId && (() => {
                console.log(dispatch);
                dispatch(clickedDish({dishId:dishId, dishName:title}));
            })}>
            <div className="thumbnail">
                <img src={imageURL} className="dishImg"></img>
                <label className="capitaliseLabel dishTitle">{title}</label>
                {cost ? <label className="currency">{cost}</label> : null}
            </div>
        </li>)
}