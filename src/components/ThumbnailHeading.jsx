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

/*
export function createThumbnailHeading({
                                           document: document,
                                           header: header,
                                           caption: caption,
                                           subCaption: subCaption,
                                      }) {

    let liElement = document.createElement("li");
    liElement.classList.add('thumbnail');
    liElement.classList.add('header');
   // liElement.addEventListener('click', () => {
     //   window.location.hash = '#dish-details'})

    if (header) {
        let headerElement = document.createElement("h1");
        headerElement.textContent = header;
        liElement.appendChild(headerElement);
    }

    let captionElement = document.createElement("label");
    captionElement.textContent = caption;
    liElement.appendChild(captionElement);

    if (subCaption) {
        let subCaptionElement = document.createElement("label");
        subCaptionElement.classList.add("currency");
        subCaptionElement.textContent = subCaption;
        liElement.appendChild(subCaptionElement);
    }

    return liElement;
}*/