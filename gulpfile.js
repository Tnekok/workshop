var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var gulpPlumber = require('gulp-plumber');

gulp.task('sass', function() {
	gulp.src('public/stylesheets/sass/*.scss')
		.pipe(gulpPlumber())
		.pipe(gulpSass())
		.pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', function() {
	gulp.watch('public/stylesheets/sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);