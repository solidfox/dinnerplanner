/**
 * Created by Daniel Schlaug on 2018-01-29.
 */
import React from "react";


export default class DishThumbnail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            title,
            dishID,
            imageURL,
            cost
        } = this.props;

        return (
            <li className="dish" onClick={(dishID !== undefined) ? () => window.location.hash = '#dish-details@' + dishID : null}>
                <div className="thumbnail">
                    <img src={imageURL} className="dishImg"></img>
                    <label className="capitaliseLabel dishTitle">{title}</label>
                    {cost ? <label className="currency">{cost}</label> : null}
                </div>
            </li>)
    }
}