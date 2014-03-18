// ref: http://dev.day.com/docs/en/cq/current/deploying/installing_cq.html

var execFile = require('child_process').execFile;
var es = require('event-stream');

module.exports = function (gulp, config) {

  var argv = config.argv;

  gulp.task('cq', function () {

    var env = 'author';

    if (argv.i || argv.install) {
      if ((argv.i || argv.install) === 'publish') {
        env = 'publish';
      }
      console.log('install cq', env);
      cqInstall(env);
    }

    if (argv.s || argv.server) {
      if ((argv.s || argv.server) === 'publish') {
        env = 'publish';
      }
      console.log('server run on', env);
      cqQuickStart(env);
    }

  });

  /**
   * install CQ5
   * CLI: gulp cq -i [author]
   * CLI: gulp cq -i publish
   * this way can also be used for run server, and can be change the port by filename '-p8888'
   * when first running, need to way for a long while.
   * @param env
   * @returns {*}
   */
  function cqInstall(env) {
    return gulp.src(['.cq', env, '*.jar'].join('/'))
      .pipe(es.map(function (file) {
        execFile(
          'java', [
            '-XX:MaxPermSize=256m',
            '-Xmx1024M',
            '-jar',
            file.relative
          ], {
            'cwd': ['.cq', env].join('/')
          }
        );
      }));
  }

  /**
   * run server by quickstart
   * CLI: gulp cq -s [author]
   * CLI: gulp cq -s publish
   * @param env
   */
  function cqQuickStart(env) {
    execFile('./quickstart', {
      'cwd': ['.cq', env, 'crx-quickstart', 'bin'].join('/')
    });
  }

};

