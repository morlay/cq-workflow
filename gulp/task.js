var gulp = require('gulp');

module.exports = function (config) {

  require('./cq/mgr')(gulp, config);
  require('./cq/vlt')(gulp, config);

  gulp.task('default', function () {
    console.log(config.argv)
  })

};