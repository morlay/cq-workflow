// ref: http://dev.day.com/docs/en/crx/current/how_to/how_to_use_the_vlttool.html

var child = require('child_process');

module.exports = {
  exec: function (args, pathArr) {
    console.log(args.join(' '));
    console.log(pathArr.join('/'));
    child.execFile(
      process.cwd() + '/.cq/vlt/bin/vlt', args, {
        'cwd': pathArr.join('/')
      }, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
  }
};

