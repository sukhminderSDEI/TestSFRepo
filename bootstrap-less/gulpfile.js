var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
 
gulp.task('less', function () {
  return gulp.src(['./src/bootstrap/index.less'])
    .pipe(less({
      paths: ['./node_modules/bootstrap-less']
    }))
    .pipe(gulp.dest('./../resource-bundles/bootstrap.resource/css'));
});

gulp.task('fonts', function () {
  return gulp.src(['./src/fonts/**'])
  .pipe(gulp.dest('./../resource-bundles/bootstrap.resource/fonts'));
});

gulp.task('images', function () {
  return gulp.src(['./src/images/**'])
  .pipe(gulp.dest('./../resource-bundles/bootstrap.resource/images'));
});