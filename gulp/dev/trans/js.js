var gutil = require('gulp-util');
var rename = require('gulp-rename');
var argv = require('yargs').argv;
var changed = require('gulp-changed');


var es = require('event-stream');


module.exports = function (gulp, config) {

  var project = config.curProj;
  var DEST = [
    '.sync',
    project.name,
    'jcr_root',
    'apps',
    project.name,
    'components'
  ].join('/');


  var SRC = [
    'src',
    project.name,
    'components'
  ].join('/');

  gulp.task('trans.js.watch', function () {
    gulp.watch([
      SRC + '/**/script/*.js'
    ], ['trans.js'])
  });

  gulp.task('trans.js', function () {


    var changedFiles = {};

    gulp.src([
        SRC + '/**/script/*.js',
        SRC + '/**/**/script/*.js'
      ])
      .pipe(rename(function (path) {
        console.log(path);
        collectJsFiles(path.dirname + '/' + path.basename + path.extname, changedFiles)
      }))
      .pipe(changed(DEST))
      .pipe(gulp.dest(DEST))
      .on('end', function () {

        console.log(changedFiles);

        es.readArray(Object.keys(changedFiles))
          .pipe(es.map(function (key, callback) {

            var fileInfo = changedFiles[key];

            var txtFile = new gutil.File({
              path: fileInfo.txtFile,
              contents: new Buffer(fileInfo.fileList.reverse().join('\n'))
            });

            var xmlFile = new gutil.File({
              path: fileInfo.xmlFile,
              contents: new Buffer('<?xml version="1.0" encoding="UTF-8"?>\n' +
                '<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"\n' +
                'jcr:primaryType="cq:ClientLibraryFolder"\n' +
                'categories="[' + project.name + '.components]"\n' +
                'dependencies="[cq.jquery]"' +
                '/>')
            });

            es.readArray([txtFile, xmlFile])
              .pipe(gulp.dest(DEST));

          }))


      });
  });
};


function collectJsFiles(filePath, files) {

  var part = filePath.split('/script/');

  if (files[part[0]]) {
    files[part[0]].fileList.push(part[1]);
  } else {
    files[part[0]] = {};
    files[part[0]].txtFile = part[0] + '/script/js.txt';
    files[part[0]].xmlFile = part[0] + '/script/.content.xml';
    files[part[0]].fileList = [part[1]];
  }
}