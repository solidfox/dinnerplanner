import React from "react";
import {pages} from "../model/Pages";
import {navigateToPage} from "../Actions";

export default function WelcomeView (dispatch)
{
        return (
            <article className="no-menu" id="welcome-view">
                <h3 className="spacious">Welcome to Dinner Planner of Group 5.</h3>
                <h4 className="spacious">Press the button to Create a New Dinner Plan.</h4>
                <button
                        className="btn btn-danger btn-lg"
                        onClick={() => dispatch(navigateToPage(pages.selectDish))}>
                    Create New Dinner
                </button>
            </article>

        );
}
