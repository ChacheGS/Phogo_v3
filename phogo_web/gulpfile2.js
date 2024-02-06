var gulp = require('gulp');
var del = require("del");
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var inject = require("gulp-inject");
var stream = require("stream-series");
var pkg = require('./package.json');
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var runseq = require('run-sequence');
// browserSync middleware
var historyApiFallback = require('connect-history-api-fallback');
var connectLogger = require("connect-logger");

// del dev/
gulp.task('del-dev', function() {
    return del(['dev/*']);
});
// del build/
gulp.task('del-build', function() {
    return del(['build/*']);
});
// Clean previous builds
gulp.task('del', ['del-dev', 'del-build']);

// python to dev/
gulp.task('python', function() {
    gulp.src(['src/py/**/*']).pipe(gulp.dest('dev/py'));
});


// own CSSs to build/
// own JS to build/
// concat JS from build/ to dev/
// uglify JS

// copy vendors to dev/

// resources to dev/

// set watchers
// start browserSync


// compile LESS files from /less into build/css
gulp.task('less', function() {
    return gulp.src(['src/less/*.less', '!src/less/*variables*.less', '!src/less/*mixin*.less'])
        .pipe(less())
        .pipe(gulp.dest('build/css'));
});
// minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src(['build/css/*.css']).pipe(cleanCSS({
        compatibility: 'ie8'
    })).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('build/css'));
});
// minified CSS from build/ to dev/
// concat CSS (not themes)
gulp.task('concat-css', ['minify-css'], function() {
    gulp.src(['build/css/*.min.css', '!build/css/*theme*.css'])
        .pipe(concat('bundle.min.css', {newLine: ';'}))
        .pipe(gulp.dest('dev/css'));
    gulp.src('build/css/*theme.min.css').pipe(gulp.dest('dev/css'));
});
gulp.task('css', ['concat-css']);

// uglify JS
gulp.task('minify-js', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(uglify())
        /*.pipe(rename({
            suffix: '.min'
        }))*/
        .pipe(gulp.dest('build/js'))
});
// minified JS from build/ to dev/
// concat JS (not themes)
gulp.task('concat-js', ['minify-js'], function() {
    return gulp.src(['build/js/*.min.js'])
        .pipe(concat('js-bundle.min.css', {newLine: ''}))
        .pipe(gulp.dest('dev/js'));
});
gulp.task('js', ['concat-js']);

gulp.task('build', function() {
    runseq(['js', 'css', 'python', 'html', 'vendors', 'images']);
});

gulp.task('vendors', function() {

    gulp.src(['vendor/ace/**/*']) .pipe(gulp.dest('dev/vendor'));
    gulp.src(['vendor/jquery-terminal/*.min.*']).pipe(gulp.dest('dev/vendor/jquery-terminal'));
    gulp.src(['vendor/brython/brython.js', 'vendor/brython/brython_modules.js']).pipe(gulp.dest('dev/vendor/brython'));
    gulp.src(['vendor/jquery-ui-1.12.1.custom/jquery-ui.min.js']).pipe(gulp.dest('dev/js'));
    gulp.src(['vendor/jquery/jquery.min.*']).pipe(gulp.dest('dev/vendor/jquery'));
    gulp.src(['vendor/bootstrap/**/*.min.*']).pipe(gulp.dest('dev/vendor/bootstrap'));
    gulp.src(['vendor/bootstrap/fonts/**/*']).pipe(gulp.src('dev/vendor/bootstrap/fonts'))
    gulp.src(['vendor/font-awesome/**/*.min.*']).pipe(gulp.dest('dev/vendor/font-awesome'));
    gulp.src(['vendor/font-awesome/fonts/**/*']).pipe(gulp.src('dev/vendor/font-awesome/fonts'))
});

gulp.task('html', function() {
    gulp.src('src/*.html').pipe(gulp.dest('dev'));
});

gulp.task('images', function() {
    gulp.src(['src/img/**/*.png', 'src/img/**/*.gif']).pipe(gulp.dest('dev/img'));
});
// Run everything
// gulp.task('default', ['watchers']);
gulp.task('default', ['css']);
/*          function(){
    runseq('del', ['js', 'css', 'python', 'html', 'vendors', 'images'], 'browserSync', 'watchers');
});*/
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

// Reloads the browser whenever HTML, JS, LESS or Python files change
gulp.task('watchers', function() {
    //runseq(/*'del', */['minify-css', 'minify-js', 'html', 'copy', 'python'], 'browserSync');
    gulp.watch('src/**/*.less', reload(['css']));
    gulp.watch('src/**/*.js', reload(['js']));
    gulp.watch('src/**/*.py', reload(['python']));
    gulp.watch('src/**/*.html', reload(['html']));
    gulp.watch('src/**/*.[png|gif]', reload(['images']));
    // gulp.watch('vendor/brython/brython_modules.js', reload(['python']));
    gulp.watch('vendor/**/*', reload(['vendors']));
});
gulp.task('reload', function() {
    browserSync.reload();
});
function reload(previous) {
    return function () {
        return runseq(previous); //, browserSync.reload);
    } 
}
