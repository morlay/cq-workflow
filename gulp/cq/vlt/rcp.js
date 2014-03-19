var runVlt = require('./libs/runVlt');

module.exports = function (gulp, config) {

  var argv = config.argv;
  var hosts = config.hosts;
  var project = config.curProj;


  gulp.task('vlt.rcp', function () {

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

    runVlt.exec([
      'rcp',
      '-u', // update
      '-n', // new file
      '-r', // recursive
      convertPathByHost(hostInput),
      convertPathByHost(hostOutput)
    ], []);
  });


};