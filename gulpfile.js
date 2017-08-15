var gulp = require('gulp'),
    concat = require('gulp-concat'),
    gls = require('gulp-live-server'),
    less = require('gulp-less'),
    paths = {
      src: 'src/**/*',
      static: 'dist',
      less: ['src/**/*.less', 'src/*.less'], distLess: 'dist/css', distStyles: 'dist',
      templates: 'src/**/*.html', distTemplates: 'dist',
      fonts: ['src/assets/fonts/**/*', 'src/fonts/*'], distFonts: 'dist/fonts',
      images: ['src/assets/img/**/*', 'src/img/*'], distImages: 'dist/img',
      tracks: ['src/assets/tracks/**/*', 'src/tracks/*'], distTracks: 'dist/tracks',
      css: ['src/assets/css/**/*', 'src/css/*'], distCss: 'dist/css',
      scripts: 'src/**/*.js', distScript: 'dist',
      distStylesFilename: 'less.style.css', distScriptFilename: 'app.js',
      dist: 'dist/**/*',
      distWatch: [
      	'dist/components/**/*', 'dist/components/*',
	'dist/css/**/*', 'dist/css/*',
	'dist/fonts/**/*', 'dist/fonts/*',
	'dist/img/**/*', 'dist/img/*',
  'dist/tracks/**/*', 'dist/tracks/*',
	'dist/route/**/*', 'dist/route/*',
	'dist/shared/**/*', 'dist/shared/*',
	'dist/app.js', 'dist/*.html'
      ]
    };


gulp.task('less', function () {
  return gulp
    .src(paths.less)
    .pipe(less())
    .pipe(concat(paths.distStylesFilename))
    .pipe(gulp.dest(paths.distLess));
});


gulp.task('scripts', function() {
  return gulp
    .src(paths.scripts)
    .pipe(concat(paths.distScriptFilename))
    .pipe(gulp.dest(paths.distScript));
});

gulp.task('fonts', function() {
  return gulp
    .src(paths.fonts)
    .pipe(gulp.dest(paths.distFonts));
});

gulp.task('images', function() {
  return gulp
    .src(paths.images)
    .pipe(gulp.dest(paths.distImages));
});
gulp.task('tracks', function() {
  return gulp
    .src(paths.tracks)
    .pipe(gulp.dest(paths.distTracks));
});


gulp.task('css', function() {
  return gulp
    .src(paths.css)
    .pipe(gulp.dest(paths.distCss));
});


gulp.task('templates', function() {
  return gulp
    .src(paths.templates)
    .pipe(gulp.dest(paths.distTemplates));
});

gulp.task('build', ['fonts', 'images', 'tracks', 'less', 'css', 'templates', 'scripts']);

gulp.task('serve', function() {
  var server = gls.static(paths.static, 8888);
  server.start();

  gulp.watch(paths.distWatch, watch);
  function watch(file) {
    server.notify.apply(server, [file]);
  }
});

gulp.task('watch', function() {
  gulp.watch([paths.scripts], ['scripts']);
  gulp.watch([paths.templates], ['templates']);
  gulp.watch([paths.fonts], ['fonts']);
  gulp.watch([paths.images], ['images']);
    gulp.watch([paths.tracks], ['tracks']);
  gulp.watch([paths.less], ['less']);
  gulp.watch([paths.css], ['css']);
});

gulp.task('default',['build', 'serve', 'watch']);
