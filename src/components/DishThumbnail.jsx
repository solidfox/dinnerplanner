/**
 * Created by Daniel Schlaug on 2018-01-29.
 */
import React from "react";
import {navigateToPage} from "../Actions";
import {pages} from "../model/Pages";


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
                dispatch(navigateToPage({page: pages.dishDetails, id:dishId, name:title}));
            })}>
            <div className="thumbnail">
                <img src={imageURL} className="dishImg" />
                <label className="capitaliseLabel dishTitle">{title}</label>
                <br/>
                {cost ? <label className="currency">{cost} per person</label> : null}
            </div>
        </li>)
}