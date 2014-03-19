var child = require('child_process');


module.exports = function (gulp, config) {

  var argv = config.argv;
  var project = config.curProj;


  gulp.task('commit', function () {
    if (argv.m) {
      if (argv.m) {
        gitExec([
          'add',
          '--all'
        ], ['.']);

        gitExec([
          'commit',
          '-m',
          '"' + argv.m + '"'
        ], ['.'])
      }
    }

  });

  gulp.task('git', function () {


    var pathArr = [
      'src',
      project.name
    ];


    if (argv.init) {

      gitExec([
        'init'
      ], pathArr);
    }

    if (argv.m) {

      gitExec([
        'add',
        '--all'
      ], pathArr);

      gitExec([
        'commit',
        '-m',
        '"' + argv.m + '"'
      ], pathArr)
    }

    if (argv.push) {
      gitExec([
        'push',
        '-u',
        'origin',
        argv.push
      ], pathArr);
    }

    if (argv.pull) {
      gitExec([
        'pull'
      ], pathArr)
    }

    if (argv.remote) {

      gitExec([
        'remote',
        'add',
        'origin',
        argv.remote
      ], pathArr, function () {
        gitExec([
          'remote',
          'set-url',
          'origin',
          argv.remote
        ], pathArr);
      });


    }

  })

};

function gitExec(args, pathArr, callback) {
  console.log(args.join(' '));
  console.log(pathArr.join('/'));
  child.execFile(
    'git', args, {
      'cwd': pathArr.join('/')
    }, function (error, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        callback();
        console.log('exec error: ' + error);
      }
    });
}

