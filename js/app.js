import {Rx} from '/node_modules/rxjs/Rx.js';

$(function() {
	//We instantiate our model
    let model = new DinnerModel();

    // And create the instance of ExampleView
    let exampleView = new ExampleView($("#exampleView"));

    let menuView = new MenuView($("menu-view"));
	let welcomeView = new WelcomeView($('welcome-view'));
	let selectDishView = new SelectDishView($('select-dish-view'));
    let dishDetailsView = new DishDetailsView($('dish-details-view'));
    let dinnerOverviewView = new DinnerOverviewView($('dinner-overview-view'));
    let dinnerPrintView = new DinnerPrintView($('dinner-print-view'));

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