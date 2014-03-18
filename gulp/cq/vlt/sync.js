var vlt = require('./util');

module.exports = function (gulp, config) {

  var argv = config.argv;
  var projects = config.projects;
  var hosts = config.hosts;


  gulp.task('vlt.sync', function () {

    // set project

    console.log(argv);

    var project = vlt.checkProject(argv, projects);

    if (!project) {
      return;
    }

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
      vlt.runVlt([
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
      vlt.runVlt([
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
      vlt.runVlt([
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
      vlt.runVlt([
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