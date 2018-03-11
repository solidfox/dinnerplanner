/**
 * Created by Daniel Schlaug on 2018-01-26.
 */

// var webpack = require('webpack');

var config = {
    context: __dirname + '/src', // `__dirname` is root of project and `src` is source
    entry: {
        app: './App.jsx',
    },
    output: {
        path: __dirname + '/dist', // `dist` is the destination
        publicPath: '/dist/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test:/\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    // For development https://webpack.js.org/configuration/devtool/#for-development
    devtool: 'source-map',
    devServer: {
        contentBase: __dirname, // `__dirname` is root of the project
    },
};

module.exports = config;