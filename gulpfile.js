const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

function style() {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
  .pipe(autoprefixer({
    cascade: false
  }))
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./assets/scss/**/*.scss', {
    ignoreInitial: false
  }, style);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('./assets/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;