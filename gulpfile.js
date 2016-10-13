/*jshint node: true */
'use strict';

var gulp = require('gulp');
var jslint = require('gulp-jslint');
var jshint = require('gulp-jshint');

	
gulp.task('jshint', function () {

	return gulp.src(['*.js', 'lib/**/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('default',['jshint'], function() {
 
});