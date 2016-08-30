var gulp = require('gulp'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    livereload = require('gulp-livereload');

gulp.task('default', function() {
	livereload.listen();
    gulp.watch('./app/javascript/*.js', ['concat']);
    gulp.watch('./app/less/*.less', ['less']);
});


gulp.task('concat', function() {
    return gulp.src('./app/javascript/*.js')
        .pipe(concat('js.js'))
        .pipe(gulp.dest('./app/'))
        .pipe(livereload());
})

var autoprefix = new LessAutoprefix({ browsers: [
						'> 1%',
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'] });

gulp.task('less', function() {
    return gulp.src('./app/less/css.less')
        .pipe(less({
        	plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./app/'))
        .pipe(livereload());
});



