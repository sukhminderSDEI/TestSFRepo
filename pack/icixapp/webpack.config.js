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
        path: __dirname + '/app', 
        //path: '../../resource-bundles/xResouceNamex.resource',
        filename: 'bundle.js'
    },
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