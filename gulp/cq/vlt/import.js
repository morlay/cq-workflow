var vlt = require('../../util/util');

module.exports = function (gulp, config) {

  var argv = config.argv;
  var projects = config.projects;
  var hosts = config.hosts;


  gulp.task('vlt.import', function () {

    // set project

    console.log(argv);

    var project = vlt.checkProject(argv, projects);

    if (!project) {
      return;
    }

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

    vlt.runVlt([
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