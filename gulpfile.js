var gulp = require('gulp'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    livereload = require('gulp-livereload'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify');


var cleanCSSPlugin = new LessPluginCleanCSS({advanced: true}),
    autoprefix = new LessAutoprefix({ browsers: [
						'> 1%',
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'] });

gulp.task('less', function(callback) {
    return gulp.src('./app/less/css.less')
        .pipe(less({
        	plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./app/'))
        .pipe(livereload());
});
gulp.task('concat', function(callback) {
    return gulp.src('./app/javascript/*.js')
        .pipe(concat('js.js'))
        .pipe(gulp.dest('./app/'))
        .pipe(livereload());
})
gulp.task('minify', ['less'], function(callback) {
    return gulp.src('./app/css.css')
        .pipe(less({
            plugins: [cleanCSSPlugin]
        }))
        .pipe(gulp.dest('./app/'));
});
gulp.task('uglify', ['concat'], function(callback) {
     return gulp.src('./app/js.js')
     .pipe(babel({
        presets:['es2015']
     }))
     .pipe(uglify())
     .pipe(gulp.dest('./app'));
})

gulp.task('html', function() {
    return gulp.src([
        './app/*.html'
    ])
    .pipe(livereload());
});

gulp.task('build', ['uglify', 'minify']);

gulp.task('default', function() {
    livereload.listen();
    gulp.watch('./app/javascript/*.js', ['concat']);
    gulp.watch('./app/less/*.less', ['less']);
    gulp.watch('./app/*.html', ['html']);
});
