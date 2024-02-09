const gulp = require('gulp');
const gutil = require('gulp-util'); // for noop() pipe
const gif = require('gulp-if');

const env = require(__dirname + '/../config').env;

/* modules for this task */

/* Extract the relevant parts for this env & task */
const name = 'watch';
const constants = env.constants;
const paths = env.paths;
const plugin_opts = env.plugin[name];
const run_opts = env.run.watch;

gulp.task(name, ['serve'], function () {
    let files = run_opts.files.keys();
    for (let i = 0; i < files.length; ++i) {
        if (run_opts.files[i] && paths[files[i].dest]) {
            gulp.watch()
        }
    }
    gulp.watch
})