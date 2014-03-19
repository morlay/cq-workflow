var gutil = require('gulp-util');
var argv = require('yargs').argv;
var changed = require('gulp-changed');

module.exports = function (gulp, config) {

  var project = config.curProj;


  gulp.task('trans.mirror', function () {



    var dest = [
      '.sync',
      project.name,
      'jcr_root',
      'apps',
      project.name
    ].join('/');


    var src = [
      'src',
      project.name
    ].join('/');


    gulp.src([
        src + '/**/**/*.jsp',
        src + '/**/**/.content.xml'
      ])
      .pipe(changed(dest))
      .pipe(gulp.dest(dest))


  });
};
