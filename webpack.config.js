/**
 * Created by Daniel Schlaug on 2018-01-26.
 */

// var webpack = require('webpack');

var config = {
    context: __dirname + '/js', // `__dirname` is root of project and `src` is source
    entry: {
        app: './app.js',
    },
    output: {
        path: __dirname + '/dist', // `dist` is the destination
        publicPath: '/dist/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
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