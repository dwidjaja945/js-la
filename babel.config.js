/* eslint-disable */

module.exports = function (api) {
    if (api) {
        api.cache(true);
    }
    const modules = api ? false : undefined; // TS-Jest needs modules. Webpack handles it automatically

    const presets = [
        ['@babel/preset-env', {
            useBuiltIns: 'usage',
            corejs: '3', // this needs to be tied to the version of core-js we installed in package.json
            modules: modules,
            debug: false,
        }],
        '@babel/preset-react',
    ];
    const plugins = [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-transform-strict-mode',
        '@babel/plugin-proposal-function-sent', //Stage 2
        '@babel/plugin-proposal-json-strings', //Stage 4
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-numeric-separator',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-throw-expressions', //Stage 2- Currently unsupported in Typescript
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
    ];

    return {
        presets,
        plugins,
    };
};