'use strict';

var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync').create();
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var fs = require('fs');


gulp.task('partials', () => {
    let pckg = JSON.parse(fs.readFileSync('./package.json'));

    return gulp.src(config.html.src)
        .pipe($.inject(gulp.src(config.html.partials), {
            starttag: '<!-- inject:{{path}} -->',
            relative: true,
            removeTags: false,
            transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8')
            }
        }))
        .pipe($.replace('$version$', pckg.version))
        //.pipe($.htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(config.html.dest));
});

// TODO: Add SCSS Lint
/** Asset Compilation */
gulp.task('scss', () => {
  log('Compiling SCSS --> CSS');

  return gulp
    .src(config.scss.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    //.pipe($.watch(config.scss.src))
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: ['last 2 versions', '> 5%']}))
    .pipe($.csso())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.scss.dest));
});

gulp.task('script', () => {
  log('Compiling Javascript');

  return gulp
    .src(config.js.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.eslint())
    .pipe($.uglify({ mangle: false, keep_fnames: true, compress: true, output: { comments: true } }))
    .pipe($.rename('script.min.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.js.dest));
});

/** Dependencies */
gulp.task('bootstrap-scss', () => {
  log('Compiling Bootstrap Styles');

  return gulp
    .src(config.bootstrap.scss.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    //.pipe($.watch(config.scss.src))
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: ['last 2 versions', '> 5%']}))
    .pipe($.csso())
    .pipe($.rename('bootstrap.min.css'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.bootstrap.scss.dest));
});

gulp.task('bootstrap-js', () => {
  log('Compiling Bootstrap Javascript');

  return gulp
    .src(config.bootstrap.js.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.eslint())
    .pipe($.uglify({ mangle: false, keep_fnames: true, compress: true, output: { comments: true } }))
    .pipe($.rename('bootstrap.min.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.bootstrap.js.dest));
});


gulp.task('jquery', () => {
  log('Compiling jQuery Files');

  return gulp
    .src(config.jquery.js.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.eslint())
    .pipe($.uglify({ mangle: false, keep_fnames: true, compress: true, output: { comments: true } }))
    .pipe($.rename('jquery.min.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.jquery.js.dest));
});

/** Watchers */
gulp.task('all', () => {
  gulp.watch([config.scss.src, config.js.src], gulp.parallel('scss', 'script'));
});

gulp.task('styles', () => {
	gulp.watch([config.scss.src, config.js.src], gulp.parallel('scss'));
});

gulp.task('scripts', () => {
	gulp.watch([config.scss.src, config.js.src], gulp.parallel('script'));
});

///////////////////////////////////////////////////////////////////////////

function changeEvent(event) {
  var srcPattern = new RegExp('/.*(?=/' +  config.all.web + ')/');
  log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type)
}

function clean(path) {
  log('Cleaning: ' + $.util.colors.blue(path));
  return del(path);
}

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
          $.util.log($.util.colors.blue(msg[item]));
      }
    }
  }
  else {
    $.util.log($.util.colors.blue(msg));
  }
}
