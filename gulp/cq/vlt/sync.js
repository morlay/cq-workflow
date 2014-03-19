var runVlt = require('./libs/runVlt');


module.exports = function (gulp, config) {

  var argv = config.argv;
  var hosts = config.hosts;
  var project = config.curProj;


  gulp.task('vlt.sync', function () {


    var host = 'local';

    if ((argv.h || argv.host)) {
      host = (argv.h || argv.host);
    }

    var hostObj = hosts[host];

    if (!hostObj) {
      console.log('bad host');
      return;
    }

    var workspace = [
      '.sync'
    ];


    if (argv.i || argv.install) {
      runVlt.exec([
        '--credentials',
        [hostObj.user, hostObj.password].join(':'),
        'sync',
        '--uri',
        [hostObj.protocol, '://' , hostObj.host , ':', hostObj.port, '/crx'].join(''),
        'install',
        '--force'
      ],
        workspace.concat([
          project.name,
          'jcr_root'
        ])
      );
    }

    if (argv.s || argv.status) {
      runVlt.exec([
        '--credentials',
        [hostObj.user, hostObj.password].join(':'),
        'sync',
        'status',
        '--uri',
        [hostObj.protocol, '://' , hostObj.host , ':', hostObj.port, '/crx'].join('')
      ],
        workspace.concat([
          project.name,
          'jcr_root'
        ])
      );
    }

    if (argv.r || argv.run) {
      runVlt.exec([
        '--credentials',
        [hostObj.user, hostObj.password].join(':'),
        'sync',
        '--uri',
        [hostObj.protocol, '://' , hostObj.host , ':', hostObj.port, '/crx'].join('')
      ],
        workspace.concat([
          project.name,
          'jcr_root'
        ])
      );
    }

    if (argv.u || argv.unregister) {
      runVlt.exec([
        '--credentials',
        [hostObj.user, hostObj.password].join(':'),
        'sync',
        'unregister',
        '--uri',
        [hostObj.protocol, '://' , hostObj.host , ':', hostObj.port, '/crx'].join('')
      ],
        workspace.concat([
          project.name,
          'jcr_root'
        ])
      );
    }

  });


};