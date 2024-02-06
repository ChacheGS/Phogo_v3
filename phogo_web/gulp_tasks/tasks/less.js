const gulp = require('gulp');
const gutil = require('gulp-util'); // for noop() pipe
const gif = require('gulp-if');

const env = require(__dirname + '/../config').env;

/* modules for this task */
const less = require('gulp-less');
const header = require('gulp-header');

/* Extract the relevant parts for this env & task */
const constants = env.constants;
const paths = env.paths;
const run_opts = env.run.css;
const plugin_opts = env.plugin.less;

/* Compile .less files into .css files */
/* adding header to the files */
gulp.task('less', function() {
    return gulp.src(paths.less.src)
        .pipe( gif(run_opts.less, less(plugin_opts), gutil.noop()) )
        .pipe( gif(run_opts.header && constants.header, header(constants.header)) )
        .pipe( gulp.dest(paths.less.dest) )
});