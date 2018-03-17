/**
 * Created by Daniel Schlaug on 2018-01-29.
 */

import React from "react";
export class ThumbnailHeading extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            header,
            caption,
            subCaption,
        } = this.props;

        return (
            <li className="thumbnail header" >
                {header ? <h1>{header}</h1> : null }
                <label>{caption}</label>
                {subCaption ? <label className="currency">{subCaption}</label> : null}
            </li>)
    }
}