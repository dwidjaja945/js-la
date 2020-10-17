#!/usr/bin/env node

const path = require('path');

const babelPath = path.resolve(__dirname, '../../babel.config.js');
const packagePath = path.resolve(__dirname, '../../package.json');
const babelConfig = require(babelPath)({ cache: () => {} });
const packages = require(packagePath);

const corejsVersion = babelConfig.presets.find(item => typeof item !== 'string' && item[0] === '@babel/preset-env')[1].corejs;
const packageVersion = packages.dependencies['core-js'];

const num1 = corejsVersion.replace(/\D/g, '');
const num2 = packageVersion.replace(/\D/g, '');

if (num1[0] === num2[0]) {
    console.log('core-js matches dependency');
} else {
    console.error('core-js dependency does not match what is in package.json. You most likely have to update your babel config to match your package.json');
    process.exit(1);
}
