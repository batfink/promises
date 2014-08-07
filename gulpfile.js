var gulp = require('gulp');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var browserify = require('gulp-browserify');
var download = require('gulp-download');
var tap = require('gulp-tap');

gulp.task('connect', function() {
    connect.server({
        root: 'www',
        livereload: true,
        port: 9001
    })
})

gulp.task('reload', function() {
    gulp.src('www').pipe(connect.reload());
})

gulp.task('scripts', function() {
    gulp.src('src/app.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(gulp.dest('./www/js'))
        .pipe(connect.reload())
})

gulp.task('watch', function() {
    gulp.watch(['src/*'], ['scripts'])
})

gulp.task('default', ['connect', 'watch']);



// run gulp setup first

gulp.task('setup', function(){

    var url = 'http://www.html5rocks.com/en/tutorials/es6/promises/',
        dest = 'www/json';

    // copy index.html
    gulp.src('src/index.html').pipe(gulp.dest('www'));

    // download json-files to use with the experiment
    download(url + 'story.json').pipe(tap(function(file) {
        JSON.parse(file.contents).chapterUrls.forEach(function(chapterUrl) {
            download(url + chapterUrl).pipe(gulp.dest(dest))
        });
    })).pipe(gulp.dest(dest));


})
