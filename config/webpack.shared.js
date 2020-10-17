const webpack = require('webpack'); 
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// will be used for unsupported browsers
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const localIdentName = isProduction ? '[hash:base64:5]' : '[name]_[local]_[contenthash:base64:5]';

const babelLoader = {
    loader: 'babel-loader',
    options: { babelrc: true },
};

module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            hash: true,
            chunks: ['main'],
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new MiniCssExtractPlugin({
            filename: isProduction ? '[name].[hash].css' : '[name].css',
            chunkFilename: isProduction ? '[id].[hash].css' : '[id].css',
            ignoreOrder: false,
        })
    ],
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                extractComments: 'all',
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
            chunks: 'all',
        }
    },
    stats: {
        colors: true,
        reasons: false,
        errorDetails: true,
    },
    resolve: {
        modules: [
            path.resolve(__dirname, '../'),
            path.resolve(__dirname, '../src'),
            path.resolve(__dirname, '../node_modules'),
            'node_modules',
        ],
        extensions: ['.tsx', '.ts', '.js', '.scss', '.json', '.png'],
        alias: {
            "@components": path.resolve(__dirname, '../src/components'),
            "@contexts": path.resolve(__dirname, '../src/contexts'),
            "@toolkit": path.resolve(__dirname, "../src/toolkit"),
            "@hooks": path.resolve(__dirname, '../src/toolkit/hooks'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    babelLoader,
                    'ts-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isProduction === false,
                            reloadAll: true,
                        }
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: 'local',
                                localIdentName,
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({}),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ]
            }
        ]
    }
};