var gulp   = require('gulp')

var livereload = require('gulp-livereload');

var fs = require('fs')
fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
    require('./gulp/' + task)
})


gulp.task('dev', ['watch:css', 'watch:js']);

gulp.task('dev-all', ['live-reload', 'watch:css', 'watch:js', 'dev:server']);


gulp.task('dev1', ['watch:css', 'watch:js', 'dev:server'], function() {

    gulp.watch('**/*.html').on('change', function(file) {
        //livereload();
        //livereload().changed(file.path);
        //console.log('html changed');
        notifyLiveReload(file);
    });

});

var tinylr;
gulp.task('livereload1', function() {
    console.log('called livereload1')
    tinylr = require('tiny-lr')();
    tinylr.listen(4002);
});

function notifyLiveReload(event) {
    var fileName = require('path').relative(__dirname, event.path);

    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('dev2', ['livereload1', 'watch:css', 'watch:js', 'dev:server'], function() {
    gulp.watch('*.html', notifyLiveReload);
});




