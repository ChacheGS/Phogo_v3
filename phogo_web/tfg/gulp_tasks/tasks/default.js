const gulp = require('gulp');
const runseq = require('run-sequence');

gulp.task('all', function() {
    return runseq('clean', ['minify-css', 'minify-js', 'serve']);
})

gulp.task('default', ['all']);