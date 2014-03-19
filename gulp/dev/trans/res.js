var gutil = require('gulp-util');
var vlt = require('../../util/util');


module.exports = function (gulp, config) {

  var projects = config.projects;
  var argv = config.argv;

  gulp.task('trans.res', function () {

    var project = vlt.checkProject(argv, projects);

    if (!project) {
      return;
    }

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

      .pipe(gulp.dest(dest));


  });
};
