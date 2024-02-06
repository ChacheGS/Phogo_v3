const gulp = require('gulp');
const gutil = require('gulp-util'); // for noop() pipe
const gif = require('gulp-if');

const env = require(__dirname + '/../config').env;

/* modules for this task */
const browsersync = require('browser-sync').create();
const header = require('gulp-header');
var rename = require("gulp-rename");

/* Extract the relevant parts for this env & task */
const name = 'serve';
const constants = env.constants;
const paths = env.paths.js;
const plugin_opts = env.plugin[name];
const run_opts = env.run;

gulp.task(name, function () {
    if (!run_opts.serve) return true;

    browsersync.init(plugin_opts.init);
})