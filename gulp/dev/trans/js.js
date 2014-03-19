var gutil = require('gulp-util');
var rename = require('gulp-rename');
var argv = require('yargs').argv;


var vlt = require('../../util/util');

var es = require('event-stream');


module.exports = function (gulp, config) {

  var projects = config.projects;


  gulp.task('trans.js', function () {

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

    console.log(src, dest);

    var changedFiles = {};

    gulp.src([
        src + '/**/script/*.js'
      ])
      .pipe(rename(function (path) {
        console.log(path);
        collectJsFiles(path.dirname + '/' + path.basename + path.extname, changedFiles)
      }))
      .pipe(gulp.dest(dest))
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
                'categories="[' + project.name + '.components]"/>')
            });

            es.readArray([txtFile, xmlFile])
              .pipe(gulp.dest(dest));

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