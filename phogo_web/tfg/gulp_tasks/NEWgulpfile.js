//let gulp = require('gulp');
//let util = require('gulp-util');
const requiredir = require('require-dir');
const config = require('./gulp_tasks/config');

/* config will take care of selecting the environment */

console.log('\n\tBuilding for', config.env.name, '\n');

requiredir('./gulp_tasks/tasks');