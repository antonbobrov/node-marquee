'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, '../demo/src'),
    public: path.join(__dirname, '../demo/public'),
    assets: 'assets/'
};

const PAGES_DIR = `${PATHS.src}/html`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'));

module.exports = {

    externals: {
        paths: PATHS
    },
    
    entry: {
        app: PATHS.src + '/js/index.js'
    }, 
    output: {
        filename: `${PATHS.assets}js/[name].js`,
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
            },
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.(png|jpg|gif|svg)?$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: NODE_ENV == 'development'
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: NODE_ENV == 'development',
                            config: {
                                path: PATHS.src + '/styles/postcss.config.js'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: NODE_ENV == 'development'
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: NODE_ENV == 'development',
                            config: {
                                path: PATHS.src + '/styles/postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: NODE_ENV == 'development',
                            sassOptions: {
                                "includePaths": [
                                    require('path').resolve(__dirname, 'node_modules')
                                ]
                            }
                        }
                    }
                ]
            }
        ]

    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`
        }),
        new CopyWebpackPlugin([
            // { from: `${PATHS.src}/folder`, to: `${PATHS.assets}folder` },
        ]),
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`
        })),
    ],

};