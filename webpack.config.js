const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: {} },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['ie >= 8', 'last 4 version']
                                }),
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.ico$/,
                loader: "url-loader",
                query: { mimetype: "image/x-icon" }
            },

            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/'
                    }
                }]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default',
                    {
                        discardComments:
                        {
                            removeAll: true
                        }
                    }],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: __dirname + "/public/index.html",
            favicon: __dirname + "/public/favicon.ico",
            // minify: { collapseWhitespace: true },
            inject: 'body',
            files: {
                css: [__dirname + "main.css"],
                js: [__dirname + "main.js"],
            }
        })
    ],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'main.js',
    },
};
