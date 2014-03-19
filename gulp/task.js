var gulp = require('gulp');
var clean = require('gulp-clean');

module.exports = function (config) {

  config.curProj = checkProject(config.argv, config.projects);

  if (!config.curProj) {
    throw new Error('the project ' + (config.argv.p || config.argv.project) + ' is no config');
  }


  require('./cq/mgr')(gulp, config);
  require('./cq/vlt')(gulp, config);

  require('./dev/trans')(gulp, config);

  gulp.task('clean', function () {
    gulp.src('.sync/' + config.curProj.name + '/**').pipe(clean());
  });

  gulp.task('default', ['trans', 'trans.watch']);

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