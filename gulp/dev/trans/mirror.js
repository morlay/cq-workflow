var gutil = require('gulp-util');
var argv = require('yargs').argv;
var changed = require('gulp-changed');
var vlt = require('../../util/util');

module.exports = function (gulp, config) {

  var projects = config.projects;


  gulp.task('trans.mirror', function () {

    var project = vlt.checkProject(argv, projects);

    if (!project) {
      return;
    }

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
