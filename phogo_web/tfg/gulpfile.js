var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var minify = require('gulp-minify');
var pkg = require('./package.json');
var concat = require("gulp-concat");
var runseq = require('run-sequence');
var historyApiFallback = require('connect-history-api-fallback');
var connectLogger = require("connect-logger");
var del = require("del");
// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src(['src/less/*.less', '!src/less/*variables*.less', '!src/less/*mixin*.less']).pipe(less()).pipe(gulp.dest('dev/css'))
});
// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src(['!dev/css/*.min.css', 'dev/css/*.css']).pipe(cleanCSS({
        compatibility: 'ie8'
    })).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('dev/css'))
});
// Copy JS to res
gulp.task('js', function() {
    return gulp.src(['src/js/*.js']).pipe(gulp.dest('dev/js'))
});
// Clean previous builds
gulp.task('del', function() {
    return del(['dev/*']);
});
// Run all compilation and minification tasks
gulp.task('minify', ['minify-css', 'minify-js']);
// Minify JS
gulp.task('minify-js', ['js'], function() {
    return gulp.src(['src/css/*.js', '!src/css/*.min.js', 'vendor/jquery-ui-1.12.1.custom/jquery-ui.js']).pipe(minify()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('dev/js'))
});
// Copy vendor libraries from /bower_components into /vendor
gulp.task('copy', function() {
    gulp.src(['bower_components/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*']).pipe(gulp.dest('dev/vendor/bootstrap'));
    gulp.src(['bower_components/font-awesome/**/*', '!bower_components/font-awesome/*.json', '!bower_components/font-awesome/.*']).pipe(gulp.dest('dev/vendor/font-awesome'));
    gulp.src(['bower_components/jquery/dist/jquery.*']).pipe(gulp.dest('dev/vendor/jquery'));
    gulp.src(['bower_components/bootstrap-toggle/css/bootstrap-*', 'bower_components/bootstrap-toggle/js/bootstrap-*']).pipe(gulp.dest('dev/vendor/bootstrap-toggle'));

    gulp.src(['vendor/jquery-terminal/*.min.*']).pipe(gulp.dest('dev/vendor/jquery-terminal'));
    gulp.src('vendor/ace/**/*').pipe(gulp.dest('dev/vendor/ace'));
    gulp.src('vendor/brython/**/*').pipe(gulp.dest('dev/vendor/brython'));
    /*gulp.src(['bower_components/metisMenu/res/*'])
    .pipe(gulp.dest('vendor/metisMenu'));*/
})
gulp.task('python', function() {
    gulp.src(['src/py/**/*']).pipe(gulp.dest('dev/py'));
    gulp.src(['dev/vendor/jquery-ui-1.12.1.custom/jquery-ui.js']).pipe(gulp.dest('dev/js'));
});
// Run everything
gulp.task('default', ['dev']);
gulp.task('html', function() {
    gulp.src('src/*.html').pipe(gulp.dest('dev'));
    gulp.src('src/img/**/*').pipe(gulp.dest('dev/img'));
});
// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            host: '0.0.0.0',
            baseDir: 'dev/'
        },
        open: false,
        middleware: [connectLogger(), historyApiFallback()],
        ui: false
    })
});
// Dev task with browserSync
gulp.task('dev', function() {
    runseq('del', ['minify-css', 'minify-js', 'html', 'copy', 'python'], 'browserSync');
    // Reloads the browser whenever HTML, JS, LESS or Python files change
    gulp.watch('src/**/*.less', reload(['minify-css']));
    // gulp.watch('src/css/*.css', ['minify-css']);
    gulp.watch('src/**/*.js', reload(['minify-js']));
    gulp.watch('src/**/*.py', reload(['python']));
    gulp.watch('src/**/*.html', reload(['html']));
    // gulp.watch('dev/**/*', function() {
       // setTimeout(function() {
           // browserSync.reload();
       // }, 200);
    // });
    // gulp.watch('src/**/*', ['reload']);
    gulp.watch('vendor/**/*', reload(['copy']));
    gulp.watch('src/img/**/*', reload(['resources']));
});
gulp.task('reload', function() {
    browserSync.reload();
});
function reload(previous) {
    return function () {
        return runseq(previous); //, browserSync.reload);
    } 
}
gulp.task('resources', function() {
    gulp.src(['src/img/**/*']).pipe(gulp.dest('dev/img/'));
});