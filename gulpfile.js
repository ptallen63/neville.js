/*jshint node: true */
'use strict';

const gulp = require('gulp');
const jslint = require('gulp-jslint');
const jshint = require('gulp-jshint');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
	
gulp.task('jshint', function () {

	return gulp.src(['*.js', 'lib/**/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', () => 
    gulp.src('test.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}))
);

gulp.task('pre-test', function () {
  return gulp.src(['lib/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
  return gulp.src(['test/**/*.js'])
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('default',['jshint'], function() {
 	gulp.watch(['lib/**/*.js','*.js'], ['jshint']);
});