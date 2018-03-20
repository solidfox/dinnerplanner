import React from "react";
import {pages} from "../model/Pages";
import {navigateToPage} from "../model/Actions";

export default function WelcomeView({dispatch, connectivity}) {
    const bodyOnline =
        <h4 className="spacious">
            Press the button to Create a New Dinner Plan.
        </h4>;

    const bodyOffline = <h4 className="spacious error">⚠️ Error! No connection found. <br/><br/>
        If you proceed with DinnerPlanner, <br/>
        only data stored in local storage will be accesible.</h4>;

    return (
        <article className="no-menu" id="welcome-view">
            <h3 className="spacious">Welcome to Dinner Planner of Group 5.</h3>
            {connectivity === 'online' ? bodyOnline : bodyOffline}
            <button
                className="btn btn-danger btn-lg"
                onClick={() => dispatch(navigateToPage(pages.selectDish))}>
                Create New Dinner
            </button>
        </article>
    );
}
