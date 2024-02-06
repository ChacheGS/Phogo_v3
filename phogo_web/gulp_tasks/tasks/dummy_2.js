const gulp = require('gulp');

const env = require(__dirname + '/../config').env;

/* extract the relevant parts of the environment */

gulp.task('dummy_2', function () {
    console.log('Dummy task 2', env.constants);
});