const gulp = require('gulp');

const env = require(__dirname + '/../config').env;

/* extract the relevant parts of the environment */

gulp.task('dummy_3', ['dummy_1'], function () {
    console.log('Dummy task 3. Depends on 1', env.plugin);
});