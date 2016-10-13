var gulp = require('gulp');
var jslint = require('gulp-jslint');


gulp.task('default', function() {
  return gulp.src(['lib/**/*.js'])
    .pipe(jslint())
    .pipe(jslint.reporter('stylish'));
});