//after-compile(c: Compilation)
var webpack = require('webpack');
var path = require('path');

var WebpackSalesforceDeployPlugin = require('webpack-salesforce-deploy-plugin');
module.exports = {

    context: __dirname + '/app',
    entry: './index.js',
    // Currently we need to add '.ts' to resolve.extensions array.
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    // Source maps support (or 'inline-source-map' also works)
    devtool: 'source-map',
    output: {
        path: '../../resource-bundles/custom_metadata_builder.resource',
        filename: 'bundle.js'
    },
    plugins:[
        new webpack.DefinePlugin({
            ON_TEST: (process.env.NODE_ENV === 'test') ? true : false
        }),
        new webpack.DefinePlugin({
            IS_LOCAL: (process.env.NODE_ENV === 'local') ? true : false
        }),
        new WebpackSalesforceDeployPlugin({
            jsConfigPath : __dirname + '/../jsforce.config.js',
            resourcePath : __dirname + '/../../resource-bundles/' + path.basename(__dirname) + '.resource/bundle.js',
            assetName : path.basename(__dirname)
        })
    ],
    module:{
        preLoaders: [
            /*{
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }*/

        ],
        loaders:[
            {
                test: /\.less$/,
                loader: "style!css!less?strictMath&noIeCompat"
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.html$/, exclude: /node_modules/, loader: 'raw-loader' }
        ]
    },

};
