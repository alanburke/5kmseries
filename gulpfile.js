var gulp = require('gulp');
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del');
    shell = require('gulp-shell');


gulp.task('styles', function() {
  return gulp.src('app/styles/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 8', 'ie 9']}))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('styles:dev', function() {
  return gulp.src('app/styles/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 8', 'ie 9']}))
    .pipe(gulp.dest('app/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task("jekyll", shell.task("jekyll build -s app -d dist"))
gulp.task("jekyll:dev", shell.task("jekyll build -s app -d dev"))

gulp.task('watch', function() {

  // Create LiveReload server
  livereload.listen();

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles']);

});

gulp.task('build', ['jekyll', 'styles']);

gulp.task('default', function() {
  // place code for your default task here
});
