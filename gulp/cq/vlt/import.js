var runVlt = require('./libs/runVlt');


module.exports = function (gulp, config) {

  var argv = config.argv;
  var project = config.curProj;
  var hosts = config.hosts;


  gulp.task('vlt.import', function () {


    var workspace = [
      '.sync'
    ];

    var host = 'local';

    if ((argv.h || argv.host)) {
      host = (argv.h || argv.host);
    }

    var hostObj = hosts[host];

    if (!hostObj) {
      console.log('bad host');
      return;
    }

    runVlt.exec([
      '--credentials',
      [hostObj.user, hostObj.password].join(':'),
      'import',
      '-v',
      [hostObj.protocol, '://' , hostObj.host , ':', hostObj.port, '/crx'].join(''),
      '.'
    ],
      workspace.concat([project.name])
    );

  });


};