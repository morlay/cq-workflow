var gulp = require('gulp');

module.exports = function (config) {

  require('./cq/mgr')(gulp, config);
  require('./cq/vlt')(gulp, config);

  require('./dev/trans')(gulp, config);

  gulp.task('default', ['trans']);

};