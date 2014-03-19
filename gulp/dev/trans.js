module.exports = function (gulp, config) {

  require('./trans/stylus')(gulp, config);
  require('./trans/js')(gulp, config);
  require('./trans/mirror')(gulp, config);
  require('./trans/res')(gulp, config);

  gulp.task('trans', ['trans.stylus', 'trans.mirror', 'trans.res', 'trans.stylus']);
  gulp.task('trans.watch', ['trans.stylus.watch', 'trans.mirror.watch', 'trans.res.watch', 'trans.stylus.watch']);

};


