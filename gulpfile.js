var gulp = require('gulp');
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del');
    shell = require('gulp-shell');
    rev    = require('gulp-rev');
    revreplace    = require('gulp-rev-replace');
    critical = require('critical');
    uncss = require('gulp-uncss');



// BrowserSync isn"t a gulp package, and needs to be loaded manually
var browserSync = require("browser-sync");
// Need a command for reloading webpages using BrowserSync
var reload = browserSync.reload;

gulp.task('styles', function() {
  return gulp.src('app/styles/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 8', 'ie 9']}))
    .pipe(uncss({
        html: ['dist/*.html']
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('copystyles', function () {
    return gulp.src(['dist/css/style.css'])
        .pipe($.rename({
            basename: "site" // site.css
        }))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('critical', ['styles'], function () {
    critical.generateInline({
        base: 'dist/',
        src: 'index.html',
        styleTarget: 'css/site.css',
        htmlTarget: 'index.html',
        width: 320,
        height: 480,
        minify: true
    });
});

gulp.task('styles:dev', function() {
  return gulp.src('app/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    // Autoprefixer breaks sourcemaps right now
    //.pipe(autoprefixer({browsers: ['last 2 versions', 'ie 8', 'ie 9']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(gulp.dest('dev/css'))
    // Injects the CSS changes to your browser since Jekyll doesn"t rebuild the CSS
    .pipe(reload({stream: true}));
});

gulp.task("jekyll", shell.task("bundle exec jekyll build"));
gulp.task("jekyll:dev", shell.task("bundle exec jekyll build -s app -d dev"));
gulp.task("jekyll:rebuild", ["jekyll:dev"], function () {
  reload;
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles:dev']);

  // Watch Jekyll files
  gulp.watch(['app/**/*.md', 'app/**/*.html', 'app/**/*.yml', 'app/**/*.txt', 'app/**/*.js'], ['jekyll:rebuild']);

  gulp.watch("dev/*.html").on('change', reload);

});

// BrowserSync will serve our site on a local server for us and other devices to use
// It will also autoreload across all devices as well as keep the viewport synchronized
// between them.
gulp.task("serve:dev", ["styles:dev", "jekyll:rebuild"], function () {
  browserSync({
    notify: true,
    open: false,
    tunnel: false,
    server: {
      baseDir: "dev"
    }
  });
});


gulp.task('revision', function () {
    // by default, gulp would pick `assets/css` as the base,
    // so we need to set it explicitly:
    return gulp.src(['dist/css/*.css', 'dist/scripts/*.js'], {base: 'dist'})
        .pipe(gulp.dest('dist'))
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist'));
});

gulp.task("revreplace", ["revision"],  function(){
  var manifest = gulp.src("dist/rev-manifest.json");

  return gulp.src("dist" + "/*.html")
    .pipe(revreplace({manifest: manifest}))
    .pipe(gulp.dest("dist"));
});

gulp.task('build', ['jekyll', 'styles']);

gulp.task("default", ["serve:dev", "watch"]);
