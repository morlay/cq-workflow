var runVlt = require('./libs/runVlt');

module.exports = function (gulp, config) {

  var argv = config.argv;
  var hosts = config.hosts;
  var project = config.curProj;

  gulp.task('vlt.export', function () {

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
      'export',
      '-v',
      [hostObj.protocol, '://' , hostObj.host , ':', hostObj.port, '/crx'].join(''),
      '/apps/' + project.name,
      project.name
    ],
      workspace
    );

  });
};