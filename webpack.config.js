/**
 * Created by Daniel Schlaug on 2018-01-26.
 */

// var webpack = require('webpack');

var config = {
    context: __dirname + '/src',
    entry: {
        app: './index.js',
    },
    output: {
        path: __dirname + '/public/dist',
        publicPath: '/dist',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx']
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
        contentBase: __dirname + "/public", // `__dirname` is root of the project
        historyApiFallback: true,
        // hot: true,
    },
};

module.exports = config;