//after-compile(c: Compilation)
var webpack = require('webpack'); // used for plugins

var path = require('path'); // used for webpack-salesforce-deploy-plugin

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); // used to create the common.js bundle
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin'); // used to create the manifest json

var WebpackSalesforceDeployPlugin = require('webpack-salesforce-deploy-plugin');
module.exports = {

    context: __dirname + '/app',
    entry: {
                app :'./index.js'

    },
    // Currently we need to add '.ts' to resolve.extensions array.
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    // Source maps support (or 'inline-source-map' also works)
    devtool: 'source-map',
    output: {
        path: '../../resource-bundles/home.resource',
        filename: 'bundle.js'

    },
    plugins:[
        new webpack.DefinePlugin({
            ON_TEST: (process.env.NODE_ENV === 'test') ? true : false // used to shift between test states
        }),
        new webpack.DefinePlugin({
            IS_LOCAL: (process.env.NODE_ENV === 'local') ? true : false // used to shift between local and salesforce
        }),
        new WebpackSalesforceDeployPlugin({
            jsConfigPath : __dirname + '/../jsforce.config.js',
            resourcePath : __dirname + '/../../resource-bundles/' + path.basename(__dirname) + '.resource/bundle.js',
            resourceFolderPath : __dirname + '/../../resource-bundles/' + path.basename(__dirname) + '.resource/', 
            assetName : path.basename(__dirname)
        }),
        
        //new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */'vendor.bundle.js'),
        //new CommonsChunkPlugin("commons.js", ['navBar']), // add all common components to the common.js bundle*/
        new ChunkManifestPlugin({ filename: "manifest.json",manifestVariable: "webpackManifest" }),
       /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })*/
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
                test: /\.ts$/, // a loader for typescript!!
                loader: 'typescript-loader'
            },
            {
                test: /\.less$/, // a loader for less
                loader: "style!css!less?strictMath&noIeCompat"
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }, // a loader for css
            { test: /\.html$/, exclude: /node_modules/, loader: 'raw-loader' }
        ]
    },

};
