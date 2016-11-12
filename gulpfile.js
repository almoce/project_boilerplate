var gulp = require('gulp'),
    serve = require('gulp-serve'),
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
        .pipe(gulp.dest('./app/public'))
        .pipe(livereload());
});
gulp.task('concat', function(callback) {
    return gulp.src(['./app/javascript/lib/*.js','./app/javascript/src/*.js'])
        .pipe(concat('js.js'))
        .pipe(gulp.dest('./app/public'))
        .pipe(livereload());
})
gulp.task('minify', ['less'], function(callback) {
    return gulp.src('./app/public/css.css')
        .pipe(less({
            plugins: [cleanCSSPlugin]
        }))
        .pipe(gulp.dest('./app/public'));
});
gulp.task('uglify', ['concat'], function(callback) {
     return gulp.src('./app/public/js.js')
     .pipe(babel({
        presets:['es2015']
     }))
     .pipe(uglify())
     .pipe(gulp.dest('./app/public'));
})

gulp.task('html', function() {
    return gulp.src([
        './app/public/*.html'
    ])
    .pipe(livereload());
});

gulp.task('build', ['uglify', 'minify']);

gulp.task('serve', serve('app/public'));

gulp.task('default', ['serve'], function() {
    livereload.listen();
    gulp.watch(['./app/javascript/lib/*.js','./app/javascript/src/*.js'], ['concat']);
    gulp.watch('./app/less/*.less', ['less']);
    gulp.watch('./app/public/*.html', ['html']);
});

