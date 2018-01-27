// import Rx from '/node_modules/rxjs/Rx.js';
import $ from 'jquery'
import DinnerModel from './model/dinnerModel.js'
import { MenuView } from './view/menuView.js'

console.log($);

$(function() {
	//We instantiate our model
    let model = new DinnerModel();

    // And create the instance of ExampleView
    // let exampleView = new ExampleView($("#exampleView"));

    let menuView = new MenuView($("#menu-view", model));
	let welcomeView = new WelcomeView($('#welcome-view', model));
	let selectDishView = new SelectDishView($('#select-dish-view', model));
    let dishDetailsView = new DishDetailsView($('#dish-details-view', model));
    let dinnerOverviewView = new DinnerOverviewView($('#dinner-overview-view', model));
    let dinnerPrintView = new DinnerPrintView($('#dinner-print-view', model));

    function activate(view) {

    }

    function hashchanged() {
        let hash = location.hash.replace( /^#/, '' );

        switch (hash) {
			case '':
				activate(welcomeView);
			cas
		}
    }
    
	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see menuView.js).
	 */

	$(window).hashchange(hashchanged);

});