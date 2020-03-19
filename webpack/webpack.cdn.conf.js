'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');
const webpack = require('webpack');
const preamble = require('./preamble');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../cdn'),
    public: path.join(__dirname, '../dist/cdn')
};

module.exports = {

    mode: 'production',
    
    entry: {
        index: PATHS.src + '/index.js'
    }, 
    output: {
        filename: `[name].js`,
        path: PATHS.public,
        publicPath: '/'
    },

    module: {

        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', { modules: false }]
                    ]
                }
            }
        ]

    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ],

    optimization: {
        minimize: true,
        concatenateModules: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: {
                        drop_console: false,
                        keep_fargs: false,
                        passes: 1
                    },
                    ecma: 5,
                    mangle: true,
                    output: {
                        beautify: false,
                        comments: false,
                        preamble: preamble
                    }
                }
            })
        ],
        usedExports: true,
        sideEffects: true
    },

};