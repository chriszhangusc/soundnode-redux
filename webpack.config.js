// ES5 webpack
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

const PORT = process.env.PORT || 3000;

var production = process.env.NODE_ENV === 'production';

var entry = production ?
    [ path.join(__dirname, 'client', 'index.jsx') ]
    :
    [
        // activate HMR for React
        'react-hot-loader/patch',

        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack-dev-server/client?http://localhost:3000',

        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',

        // the entry point of our app
        path.join(__dirname, 'client', 'index.jsx'),
    ];


var plugins = production ? [
    // // separate css code from bundle.js into style.css so that the browser
    // // can load javascript and css asynchrously
    // // Note in order to let the browser cache the contentm
    // new ExtractTextPlugin({
    //     filename: 'style-[contenthash:10].css'
    // }),

    new HTMLWebpackPlugin({
        template: path.join(__dirname, 'public', 'index-template.html')
    }),

    new ExtractTextPlugin({
        filename: 'style-[contenthash:10].css'
    }),
] : [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    new ExtractTextPlugin({
        filename: 'style.css'
    }),
];

// Shared plugins among all environments
plugins = plugins.concat([
    // DefinePlugin makes it possible for us to use env variables in src code
    new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(production)
    }),

]);

module.exports = {

    entry: entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: production ? '[name].bundle.[hash:12].min.js' : '[name].bundle.js',
        publicPath: production ? '/' :'/dist/',
    },

    devServer: {
        // enable HMR on the server
        hot: true,
        // Serve the static files under public folder
        contentBase: path.resolve(__dirname, 'public'),

        // match the output publicPath
        // will create folder in memory
        // on server there will be a server-root/dist folder
        publicPath: '/dist/',
        port: PORT,
        compress: true,
        stats: 'errors-only',
        // Opens new browser window when we run devserer for the first time
        open: true,
        // http://localhost:3000/api/abc will be redirect to 3001/api/abc
        proxy: {
            // /sc/api-v1/* and /sc/api-v2/*
            '/sc/*': {
                target: 'http://localhost:3001',
                secure: false
            }
        },
        historyApiFallback: true
    },
    // Use resolve.moduleDirectories only for package managers with a depth dependency structure.
    // In every other case use resolve.root.
    resolve: {

        modules: [
            // path.join(__dirname, "src"),
            "node_modules"
        ],
        alias: {
            client: path.join(__dirname, 'client'),
            assets: path.join(__dirname, 'public')
        },
        extensions: ['*','.js', '.jsx', 'stage-0']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                })
            },

            {
                test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\S+)?$/,
                use: [
                    'url-loader?limit=10000&name=images/[hash:12].[ext]'
                ]
            }
        ]
    },

    plugins: plugins,
    devtool: 'source-map'
};
