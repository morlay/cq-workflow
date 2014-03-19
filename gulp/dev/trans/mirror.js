var gutil = require('gulp-util');
var argv = require('yargs').argv;
var changed = require('gulp-changed');

module.exports = function (gulp, config) {

  var project = config.curProj;
  var DEST = [
    '.sync',
    project.name,
    'jcr_root',
    'apps',
    project.name
  ].join('/');


  var SRC = [
    'src',
    project.name
  ].join('/');

  gulp.task('trans.mirror.watch', function () {
    gulp.watch([
      SRC + '/**/**/*.jsp',
      SRC + '/**/**/.content.xml'
    ], ['trans.mirror'])
  });


  gulp.task('trans.mirror', function () {


    gulp.src([
        SRC + '/**/**/*.jsp',
        SRC + '/**/**/.content.xml'
      ])
      .pipe(changed(DEST))
      .pipe(gulp.dest(DEST))


  });
};
