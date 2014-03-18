var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var argv = require('yargs').argv;

var es = require('event-stream');


module.exports = function (gulp, CONFIG) {
  gulp.task('stylus', function () {

    var project = argv.project ? argv.project : CONFIG.PROJECT.APP_NAME;

    var basePath = [
      CONFIG.PATH.TEMP,
      project,
      'jcr_root',
      'apps',
      project,
      'components'
    ].join('/');

    console.log(basePath);

    var changedFiles = [];

    gulp.src([
        basePath + '/**/src/stylus/_*.styl'
      ])
      .pipe(stylus({
        import: ['nib'],
        set: ['compress'],
        use: ['nib']
      }))
      .pipe(rename(function (path) {

        path.dirname = path.dirname.replace('/clientlib/src/stylus', '/clientlib/dest/css');
        path.basename = path.basename.replace('_', '');

        changedFiles.push(path.dirname + '/' + path.basename + path.extname);

      }))
      .pipe(gulp.dest(basePath))
      .on('end', function () {

        var files = {};

        changedFiles.forEach(function (item) {

          var part = item.split('/clientlib/');

          if (files[ part[0]]) {
            files[ part[0]].fileList.push(part[1]);
          } else {
            files[ part[0]] = {};
            files[ part[0]].txtFile = part[0] + '/clientlib/css.txt';
            files[ part[0]].fileList = [part[1]];
          }
        });

        console.log(files);

        gulp.src([
            basePath + '/**/css.txt'
          ])
          .pipe(es.map(function (file, callback) {
            file.contents = new Buffer(files[ file.relative.split('/')[0]].fileList.reverse().join('\n'));
            return callback(null, file);
          }))
          .pipe(gulp.dest(basePath));

      });
  });
};
