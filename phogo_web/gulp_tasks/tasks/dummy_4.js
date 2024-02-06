const gulp = require('gulp');

const env = require(__dirname + '/../config').env;

/* extract the relevant parts of the environment */

gulp.task('dummy_4', ['dummy_2'], function () {
    console.log('Dummy task 4. Depends on 2', env.run);
});