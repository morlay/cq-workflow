var gutil = require('gulp-util');
var changed = require('gulp-changed');

module.exports = function (gulp, config) {

  var project = config.curProj;

  var DEST = [
    '.sync',
    project.name,
    'jcr_root',
    'apps',
    project.name,
    'components'
  ].join('/');


  var SRC = [
    'src',
    project.name,
    'components'
  ].join('/');


  gulp.task('trans.res.watch', function () {
    gulp.watch([
      SRC + '/**/res/**',
      SRC + '/**/**/res/**'
    ], ['trans.res'])
  });

  gulp.task('trans.res', function () {


    gulp.src([
        SRC + '/**/res/**',
        SRC + '/**/**/res/**'
      ])
      .pipe(changed(DEST))
      .pipe(gulp.dest(DEST));


  });
};
