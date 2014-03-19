var gutil = require('gulp-util');
var changed = require('gulp-changed');

module.exports = function (gulp, config) {

  var project = config.curProj;

  gulp.task('trans.res', function () {

    var dest = [
      '.sync',
      project.name,
      'jcr_root',
      'apps',
      project.name,
      'components'
    ].join('/');


    var src = [
      'src',
      project.name,
      'components'
    ].join('/');

    gulp.src([
        src + '/**/res/**',
        src + '/**/**/res/**'
      ])
      .pipe(changed(dest))
      .pipe(gulp.dest(dest));


  });
};
