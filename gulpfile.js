const gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util'),
	filesize = require('gulp-filesize'),
	changed = require('gulp-changed'),
	babel = require('gulp-babel')

gulp.task('default', () => {
	return gulp.src('public/app/**/*.js')
		.pipe(changed('public/build/'))
		.pipe(concat('angular-project.js'))
		.pipe(babel({ presets: ['es2015'] }))
		.pipe(uglify())
		.on('error', gutil.log)
		.pipe(filesize())
		.pipe(gulp.dest('public/build/'))
})

gulp.task('watch', () => {
	gulp.watch(['public/app/**/*.js', 'public/app/css/*.css'], ['default'])
})