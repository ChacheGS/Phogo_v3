const gulp = require('gulp');
const gutil = require('gulp-util'); // for noop() pipe
const gif = require('gulp-if');

const env = require(__dirname + '/../config').env;

/* modules for this task */
const minify = require('gulp-uglify');
var concat = require('gulp-concat');
const header = require('gulp-header');
var rename = require('gulp-rename');

/* Extract the relevant parts for this env & task */
const name = 'minify-js';
const constants = env.constants;
const paths = env.paths.js;
const plugin_opts = env.plugin[name];
const run_opts = env.run.js;

gulp.task(name, function() {
    return gulp.src(paths.src)
    /* minify */
    .pipe( gif(run_opts.minify, minify(plugin_opts), gutil.noop()) )
    /* concatenate */
    .pipe( gif(run_opts.concat, concat(plugin_opts.concat || 'all.js'), gutil.noop()) )
    /* header */
    .pipe( gif(run_opts.header && constants.header, header(constants.header)) )
    /* rename */
    .pipe( gif(plugin_opts, rename(plugin_opts), gutil.noop()) )
    /* store */
    .pipe( gulp.dest(paths.dest) )
}
)