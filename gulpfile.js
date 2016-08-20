// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

// Paths for application's folders
var paths = {
    scss: ['sass/**/*.scss'],
    css_dest: 'www/dist/',
    js_src: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/materialize/dist/js/materialize.js',
        'bower_components/jquery-validation/dist/jquery.validate.js',
        'www/js/**/*.js'
    ],
    js_dest: 'www/dist/',
    font_src: [
        'bower_components/materialize/dist/fonts/**/**',
    ],
    font_dest: 'www/fonts/',
    html_src: 'www/**/**.html'
};

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

// Style
gulp.task('css', function() {
    gulp.src(paths.scss)
        // .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sass({}))
        .on('error', sass.logError)
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.css_dest))
        .pipe(browserSync.stream());
});

// Concat and minify app.js
gulp.task('js', function() {
    gulp.src(paths.js_src)
        .pipe(concat('app.min.js'))
        // .pipe(uglify())
        .on('error', swallowError)
        .pipe(gulp.dest(paths.js_dest))
        .pipe(browserSync.stream());
});

// Concat and minify app.js
gulp.task('fonts', function() {
    gulp.src(paths.font_src)
        .pipe(gulp.dest(paths.font_dest));
});

// Web server
gulp.task('serve', ['css', 'js'], function() {
    browserSync.init({
        server: {
            baseDir: 'www'
        }
    });

    gulp.watch(paths.scss, ['css']);
    gulp.watch(paths.js_src, ['js']);
    gulp.watch(paths.html_src).on('change', browserSync.reload);
});

gulp.task('watch', ['css', 'js', 'fonts'], function() {
  gulp.watch(paths.scss, ['css']);
  gulp.watch(paths.js_src, ['js']);
  gulp.watch(paths.font_src, ['fonts']);
  gulp.watch(paths.html_src).on('change', browserSync.reload);
});

// Gulp Default Task 
gulp.task('default', ['css', 'js', 'fonts']);