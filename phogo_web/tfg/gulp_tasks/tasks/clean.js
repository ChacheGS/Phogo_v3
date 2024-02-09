const gulp = require('gulp');
const gutil = require('gulp-util'); // for noop() pipe
const gif = require('gulp-if');

const env = require(__dirname + '/../config').env;

/* modules for this task */
const del = require('del');

/* Extract the relevant parts for this env & task */
const run_opts = env.run; 
const paths = env.paths;

/* Clean previous builds */
gulp.task('clean', function () {
    return gif(run_opts.clean, del(paths.clean, {force: true, recurse: true}) );
});