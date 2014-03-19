var vlt = require('../../util/util');

module.exports = function (gulp, config) {

  var argv = config.argv;
  var projects = config.projects;
  var hosts = config.hosts;


  gulp.task('vlt.rcp', function () {

    // set project

    console.log(argv);

    var project = vlt.checkProject(argv, projects);

    if (!project) {
      return;
    }

    var hostInput = hosts[argv.i || argv.from];
    var hostOutput = hosts[argv.o || argv.to];

    if (!hostInput || !hostOutput) {
      return;
    }

    var convertPathByHost = function (host) {
      return   [
        host.protocol, '://', host.user, ':', host.password , '@', host.host , ':', host.port,
        '/crx/-/jcr:root/content/', project.content
      ].join('');
    };

    vlt.runVlt([
      'rcp',
      '-u', // update
      '-n', // new file
      '-r', // recursive
      convertPathByHost(hostInput),
      convertPathByHost(hostOutput)
    ], [
    ]);
  });


};