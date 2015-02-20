var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var glob = require('glob');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var karma = require('karma').server;
var server;
var testfiles = glob.sync('./tests/*.test.js');
var testBundler = browserify({entries: testfiles, debug: true, transform: [], cache:{}, packageCache: {}, fullPaths:true});

var options = {
    path: './api/app.js'
};

function bundle() {
    return testBundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('./tests/tests.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./tests/dst'))
        .pipe(livereload())
        .pipe(notify(function() {
            console.log("Tests bundle rebuilt");
        }));
}

testBundler = watchify(testBundler);
gulp.task('js', bundle);
testBundler.on('update', bundle);

gulp.task('server:start', function() {
    server.listen(options, livereload.listen );
});

gulp.task('test', function(done){
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});

gulp.task('livereload', function() {
    server = livereload();
});
gulp.task('default', ['livereload', 'js', 'test', 'server:start'], function() {
    function restart(file) {
        server.changed( function( error ) {
            if(!error) {
                livereload.changed(file.path);
            }
        });
    }

    gulp.watch([ './api/app.js', './api/config/**/*.js', './api/api/**/*.js', './api/views/*.ejs']).on('change', restart);
});
