const gulp = require('gulp');
const gutil = require('gulp-util'); // for noop() pipe

const env = require(__dirname + '/../config').env;

/* extract the relevant parts of the environment */
const paths = env.paths.js;

gulp.task('dummy_1', function () {
    console.log('Dummy task 1', paths);
});