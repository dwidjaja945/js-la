const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.shared.js');

const API_HOST = "http://localhost:3001";

const port = 3000;

config.mode = 'development';

config.devtool = 'eval-cheap-module-source-map';

config.devServer = {
    contentBase: path.resolve(__dirname, '../dist'),
    port,
    hot: true,
    liveReload: true,
    open: true,
    overlay: true,
    proxy: {
        target: API_HOST,
    },
}

const globalVars = {
    "process.env.NODE_ENV": process.env.NODE_ENV || 'dev',
}

Object.keys(globalVars).map(
    key => (globalVars[key] = JSON.stringify(globalVars[key]))
);

config.plugins.push(new webpack.DefinePlugin(globalVars));

module.exports = config;
