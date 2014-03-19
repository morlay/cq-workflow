var gutil = require('gulp-util');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var vlt = require('../../util/util');
var es = require('event-stream');
var changed = require('gulp-changed');

module.exports = function (gulp, config) {

  var projects = config.projects;
  var argv = config.argv;


  gulp.task('trans.stylus', function () {

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
        src + '/**/stylus/_*.styl'
      ])
      .pipe(stylus({
        use: ['nib'],
        import: [
          process.cwd() + '/src/' + project.name + '/utils/stylus/*.styl',
          'nib'
        ],
        set: ['compress']
      }))
      .pipe(rename(function (path) {

        path.dirname = path.dirname.replace('/stylus', '/style');
        path.basename = path.basename.replace('_', '');

        collectStyleFiles(path.dirname + '/' + path.basename + path.extname, changedFiles)

      }))
      .pipe(changed(dest))
      .pipe(gulp.dest(dest))
      .on('end', function () {

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


            es.readArray([txtFile, xmlFile]).pipe(gulp.dest(dest));


          }))


      });
  });
};


function collectStyleFiles(filePath, files) {

  var part = filePath.split('/style/');

  if (files[part[0]]) {
    files[part[0]].fileList.push(part[1]);
  } else {
    files[part[0]] = {};
    files[part[0]].txtFile = part[0] + '/style/css.txt';
    files[part[0]].xmlFile = part[0] + '/style/.content.xml';
    files[part[0]].fileList = [part[1]];
  }
}