var gulp = require('gulp');
var path = require('path');

gulp.task('build', function () {
  return gulp.src('docker/web/*')
    .pipe(gulp.dest('build'))
});


gulp.task('default', ['build']);
