var gulp = require('gulp')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var livereload = require('gulp-livereload')

gulp.task('js', function () {
    gulp.src(['ng/modules/main.module.js', 'ng/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'))
})

gulp.task('watch:js', ['js'], function () {
    gulp.watch('ng/**/*.js', ['js'])
})

/*
 var gulp = require('gulp');

 gulp.task('welcome', function () {
 console.log('welcome to gulp!')
 })

 gulp.task('hello', ['welcome'], function() {
 console.log('hello world');
 })
 */
