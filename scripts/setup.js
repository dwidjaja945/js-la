#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const pathToPrePush = path.resolve(__dirname, './hooks/pre-push');
const pathToHooksDirectory = path.resolve(__dirname, './hooks');


console.log('connecting git hooks');

fs.chmodSync(pathToPrePush, 0555);
child_process.execSync(`git config core.hooksPath ${pathToHooksDirectory}`, { stdio: 'inherit' });

console.log('Setup completed. To run the application run `npm start`');
console.log('for more information on running the project, go to the readme.md file in the root directory');
