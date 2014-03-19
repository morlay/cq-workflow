var gulp = require('gulp');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');

module.exports = function (config) {

  config.curProj = checkProject(config.argv, config.projects);

  if (!config.curProj) {
    throw new Error('the project ' + (config.argv.p || config.argv.project) + ' is no config');
  }

  var project = config.curProj;


  require('./cq/mgr')(gulp, config);
  require('./cq/vlt')(gulp, config);

  require('./dev/trans')(gulp, config);

  require('./dev/git')(gulp, config);

  gulp.task('clean', function () {
    gulp.src('.sync/' + project.name + '/**').pipe(clean());
  });


  gulp.task('default', ['trans', 'trans.watch'], function () {
    var server = livereload();

    gulp.watch([
        '.sync',
        project.name,
        'jcr_root',
        'apps',
        project.name,
        '**'
      ].join('/')).on('change', function (file) {
        server.changed(file.path);
      });
  });

};


function checkProject(argv, projects) {
  var project = projects[0];

  if (argv.p || argv.project) {

    project = projects.filter(function (item) {
      return (argv.p || argv.project) === item.name
    })[0];

  }
  return project;
}