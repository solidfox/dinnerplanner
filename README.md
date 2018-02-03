Interaction Programing - Lab assignment - HTML
=================================================

This project contains the startup code for HTML version of the Interaction Programing course lab assignment. For more details on how to complete the assignment follow the instructions on the [course website](https://www.kth.se/social/course/DH2642).

What's in the project
-----

* [index.html](https://github.com/kth-csc-iprog/dinnerplanner-html/blob/master/index.html) - the only HTML page you will have in this project (though while testing you can create more to make it easier). You will need to implement the skeleton of the layout there and then through code (JavaScript) create the rest
* [js/model/dinnerModel.js](https://github.com/kth-csc-iprog/dinnerplanner-html/blob/master/js/model/dinnerModel.js) - is JavaScript file that contains the model code. The file contains the model (dish, ingredient and general dinner model) as well as methods and comments that you need to fully implement to support the dinner functionalities (guests, selected dishes, etc.)
* [js/view/](https://github.com/kth-csc-iprog/dinnerplanner-html/tree/master/js/view) - here you can find a JavaScript code of an example view. The view sets up some initial components and their values.
* [js/app.js](https://github.com/kth-csc-iprog/dinnerplanner-html/blob/master/js/app.js) - this is the overall code of the application. It is responsible for initial setup of the app (when the page loads for the first time). 
* [images/](https://github.com/kth-csc-iprog/dinnerplanner-html/tree/master/images) - folder contains some pictures you can use for your dishes

## Installing dependencies

1. Make sure you have yarn `brew install yarn`
2. Run `yarn install` from the root of the project.

## Serving the site locally

### Install webpack

`brew install node`
`npm install -g webpack`
`npm install -g webpack-dev-server`

### Run the site via webpack-dev-server

Don't start files from the file-system. Serve them by running `webpack-dev-server` at the project root.

## Tutorials
* https://gokulkrishh.github.io/webpack/2017/02/03/how-to-setup-webpack-2.html
* https://www.toptal.com/front-end/webpack-browserify-gulp-which-is-better
* http://exploringjs.com/es6/ch_modules.html