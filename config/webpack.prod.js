const options = require("minimist")(process.argv.slice(2));
const webpack = require('webpack');
const config = require('./webpack.shared.js');

config.mode = 'production';

config.devtool = false;

delete config.devServer;

const buildOptions = {};
for (const property in options.env) {
    buildOptions[`process.env.${property}`] = JSON.stringify(options.env[property]);
};

const plugin = new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    __REACT_DEVTOOLS_GLOBAL_HOOK__: "({ isDisabled: true })",
    ...buildOptions
});

config.plugins.push(plugin);

module.exports = config;
